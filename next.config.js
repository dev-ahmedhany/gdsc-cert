module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/ahmed",
        destination: "/admin",
      },
      {
        source: "/preview",
        destination: "/admin",
      },
      {
        source: "/c/:id",
        destination: "/cert",
      },
      {
        source: "/validate/:id",
        destination: "/validate",
      },
    ];
  },
};
