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
};
