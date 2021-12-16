module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return {
      fallback:[
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
      ]
    };
  },
};
