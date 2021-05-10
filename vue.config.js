const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: isProduction
    ? '/browser-js-engine/'
    : '/',
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/styles/_variables.scss";
        `,
      },
    },
  },
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((options) => {
        // eslint-disable-next-line no-param-reassign
        options[0].title = 'Browser JS engine';

        return options;
      });
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      analyzerMode: process.env.BUNDLE_ANALYZER_MODE, // 'disabled' / 'server' / 'static'
      openAnalyzer: false,
    },
  },
};
