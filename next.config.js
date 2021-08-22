module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/preview',
        destination: '/admin',
      },
    ]
  },
};
