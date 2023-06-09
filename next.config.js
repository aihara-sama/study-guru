/* eslint-disable import/no-extraneous-dependencies */
const bundleAnalyzer = require("@next/bundle-analyzer");
const { i18n } = require("./next-i18next.config");

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  i18n,
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_CONETNT_DELIVERY_TOKEN:
      process.env.CONTENTFUL_CONETNT_DELIVERY_TOKEN,
    CONTENTFUL_CONETNT_PREVIEW_TOKEN:
      process.env.CONTENTFUL_CONETNT_PREVIEW_TOKEN,
    CONTENTFUL_PERSONAL_ACCESS_TOKEN:
      process.env.CONTENTFUL_PERSONAL_ACCESS_TOKEN,
    DEFAULT_HERO_IMAGE: process.env.DEFAULT_HERO_IMAGE,
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "images.ctfassets.net"],
  },
});
