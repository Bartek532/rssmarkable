/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

import pwa from "next-pwa";

const withPWA = pwa({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

/** @type {import("next").NextConfig} */
const config = withPWA({
  reactStrictMode: true,
  experimental: {
    fontLoaders: [
      {
        loader: "@next/font/google",
        options: { subsets: ["latin", "latin-ext"] },
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
});

export default config;
