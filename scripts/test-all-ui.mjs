import { spawn } from 'node:child_process';

const scripts = [
  'scripts/test-step-stack.mjs',
  'scripts/test-ar5-arrow-ribbon.mjs',
  'scripts/test-hfr6-heartwheel.mjs',
  'scripts/test-vt4-tube-ribbon.mjs',
  'scripts/test-ih8-heart-elements.mjs',
];

function runScript(script) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [script], { stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', chunk => {
      stdout += chunk;
    });
    child.stderr.on('data', chunk => {
      stderr += chunk;
    });
    child.on('exit', code => {
      if (stdout) process.stdout.write(stdout);
      if (stderr) process.stderr.write(stderr);
      if (code === 0) resolve();
      else reject(new Error(`${script} exited with code ${code}`));
    });
  });
}

await Promise.all(scripts.map(runScript));
console.log('PASS all 5 shape UI test suites');
