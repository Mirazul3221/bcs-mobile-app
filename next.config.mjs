/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    transpilePackages: ['three'],
    eslint: {
        ignoreDuringBuilds: true,
      },
      images: {
    domains: ['eduplusplus.vercel.app'],
  },
  env: {
    SITE_URL: 'https://eduplusplus.vercel.app',
  },

};

export default nextConfig;
//ok
