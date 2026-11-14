import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Hide the bottom-left Next.js badge without suppressing development error overlays.
  devIndicators: false,
  outputFileTracingRoot: __dirname,
};

export default nextConfig;

