module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return {
      afterFiles: [
        {
          source: "/ahmed",
          destination: "/admin",
        },
        {
          source: "/preview",
          destination: "/admin",
        },
        {
          source: "/validate/:id",
          destination: "/validate",
        },
      ],
    };
  },
};
