module.exports = {
  chainWebpack: config => {
    /**
     * Import/Require file as string
     */
    config.module
      .rule("raw")
      .test(/\.md$/i)
      .use("raw-loader")
      .loader("raw-loader")
      .end();
  }
};
