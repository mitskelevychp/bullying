/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            // TODO:
            value: "www.forbiz.website",
          },
        ],
        missing: [
          {
            type: "header",
            key: "x-vercel-deployment-url",
          },
        ],
        permanent: true,
        // TODO:
        destination: "https://forbiz.website/:path*",
      },
    ];
  },
};

export default nextConfig;
