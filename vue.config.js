const path = require('path');

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        '@lib': '@/composition-lib',
        '@utils': '@/utils',
        // https://github.com/facebook/react/issues/13991 使用项目中的vue ,否则多个 视图不刷新
        vue: path.resolve('./node_modules/vue')
      }
    }
  },
  outputDir: 'dist',
  assetsDir: 'static'
};
