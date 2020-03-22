const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const { override, fixBabelImports, addLessLoader, addWebpackAlias, addWebpackPlugin, overrideDevServer } = require('customize-cra');

module.exports = {
  devServer: overrideDevServer(),
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
        style: 'css',
     }),
    addWebpackAlias({
      '@src': path.resolve(__dirname, './src')
    }),
    addLessLoader({
      javascriptEnabled: true,
    }),
    addWebpackPlugin(
      new MonacoWebpackPlugin({
        languages: ['json', 'javascript', 'xml', 'html']
      })
    )
  ),
}
