/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: [
    "microsoft-cognitiveservices-speech-sdk",
    "@andresaya/edge-tts",
    "ws",
    "node-edge-tts"
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
