module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
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
