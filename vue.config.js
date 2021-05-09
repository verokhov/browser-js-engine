const path = require('path');

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
    if (isProduction) {
      config.plugin('copy')
        .tap((args) => {
          args[0].push({
            from: path.resolve(__dirname, 'public/404.html'),
            to: path.resolve(__dirname, 'dist/404.html'),
            toType: 'file',
          });

          return args;
        });
    }
  },
};
