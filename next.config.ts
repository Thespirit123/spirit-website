import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value:
              process.env.NODE_ENV === "development"
                ? "confessions.thespiritmedia.local"
                : "confessions.thespiritmedia.com.ng",
          },
        ],
        destination: "/confessions/:path*",
      },
    ];
  },
  images: {
    domains: ["thespiritmedia.com.ng", "confessions.thespiritmedia.com.ng"],
  },
   webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;
