const path = require('path');

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        '@lib': '@/composition-lib',
        '@utils': '@/utils',
        '@directives': '@/directives',
        '@components': '@/components',
        // https://github.com/facebook/react/issues/13991 使用项目中的vue ,否则多个 视图不刷新
        vue: path.resolve('./node_modules/vue/index.js'),
      },
    },
  },
  // 删除 HTML 相关的 webpack 插件
  chainWebpack: config => {
    config.plugins.delete('html');
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
  },
  outputDir: 'dist',
};
// test gpg