import { spawn } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
export async function createBrowser() {
  const profile = await mkdtemp(path.join(tmpdir(), 'step-stack-chrome-'));
  const binary = process.env.CHROME_BIN || (process.platform === 'darwin'
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : 'google-chrome');
  const chrome = spawn(binary, [
    '--headless', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank',
  ], { stdio: ['ignore', 'ignore', 'pipe'] });
  let startupError;
  let diagnostics = '';
  chrome.on('error', error => { startupError = error; });
  chrome.stderr.on('data', data => { diagnostics = (diagnostics + data).slice(-4000); });
  let socket;
  const pending = new Map();
  const errors = [];
  async function close() {
    socket?.close();
    for (const { timer, reject } of pending.values()) {
      clearTimeout(timer);
      reject(new Error('Browser closed'));
    }
    pending.clear();
    if (chrome.exitCode === null && !startupError) {
      const exited = new Promise(resolve => chrome.once('exit', resolve));
      chrome.kill('SIGTERM');
      await Promise.race([exited, sleep(2000)]);
      if (chrome.exitCode === null && chrome.signalCode === null) {
        chrome.kill('SIGKILL');
        await exited;
      }
    }
    await rm(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
  }
  try {
    let port;
    for (let attempt = 0; attempt < 100; attempt++) {
      if (startupError) throw startupError;
      if (chrome.exitCode !== null) throw new Error(diagnostics);
      try { port = (await readFile(path.join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]; } catch {}
      if (port) break;
      await sleep(100);
    }
    if (!port) throw new Error(`Chrome did not start: ${diagnostics}`);
    const targets = await fetch(`http://127.0.0.1:${port}/json/list`).then(r => r.json());
    socket = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      socket.addEventListener('open', resolve, { once: true });
      socket.addEventListener('error', reject, { once: true });
    });
    let nextId = 0;
    let lastNetworkEvent = Date.now();
    const requests = new Set();
    socket.addEventListener('message', event => {
      const data = JSON.parse(event.data);
      if (data.id && pending.has(data.id)) {
        const { resolve, reject, timer } = pending.get(data.id);
        clearTimeout(timer);
        pending.delete(data.id);
        data.error ? reject(new Error(JSON.stringify(data.error))) : resolve(data.result);
      }
      if (data.method === 'Runtime.exceptionThrown') errors.push(data.params.exceptionDetails);
      if (data.method === 'Runtime.consoleAPICalled' && data.params.type === 'error') errors.push(data.params.args);
      if (data.method === 'Network.requestWillBeSent') {
        requests.add(data.params.requestId);
        lastNetworkEvent = Date.now();
      }
      if (['Network.loadingFinished', 'Network.loadingFailed'].includes(data.method)) {
        requests.delete(data.params.requestId);
        lastNetworkEvent = Date.now();
      }
    });
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = ++nextId;
        const timer = setTimeout(() => { pending.delete(id); reject(new Error(`Timeout: ${method}`)); }, 30000);
        pending.set(id, { resolve, reject, timer });
        socket.send(JSON.stringify({ id, method, params }));
      });
    }
    async function evaluate(expression) {
      const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
      if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
      return result.result.value;
    }
    let currentUrl = null;
    async function navigate(url, width, height = 1100, readySelector = '.ssd-level') {
      await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
      if (currentUrl !== url) {
        requests.clear();
        await send('Page.navigate', { url });
        currentUrl = url;
      }
      for (let attempt = 0; attempt < 250; attempt++) {
        const ready = await evaluate(`document.readyState === 'complete' && !!document.querySelector(${JSON.stringify(readySelector)})`);
        if (ready && requests.size === 0 && Date.now() - lastNetworkEvent > 25) {
          await evaluate('document.fonts.ready.then(() => true)');
          return;
        }
        await sleep(15);
      }
      throw new Error(`Page not ready: ${url}`);
    }
    async function screenshot(file) {
      const result = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
      await writeFile(file, Buffer.from(result.data, 'base64'));
    }
    await Promise.all([send('Runtime.enable'), send('Page.enable'), send('Network.enable')]);
    return { send, evaluate, navigate, screenshot, close, errors };
  } catch (error) {
    await close();
    throw error;
  }
}
