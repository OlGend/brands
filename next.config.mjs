/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      formats: ['image/avif', 'image/webp'],
      domains: ['trckln.com', 'gobig.finance', 'bons.lol', 'www.bons.lol'],
  },
  swcMinify: true,
}

export default nextConfig;
