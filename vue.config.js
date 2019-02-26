module.exports = {
  chainWebpack: config => {
    config.module
      .rule("raw-loader")
      .test(/\.md$/i)
      .use("raw-loader")
      .loader("raw-loader")
      .end();
  }
};
