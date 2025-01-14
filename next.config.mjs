/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/users',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;