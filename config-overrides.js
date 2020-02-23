const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const { override, fixBabelImports, addLessLoader, addWebpackAlias, addWebpackPlugin } = require('customize-cra');

module.exports = override(
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
    modifyVars: { '@primary-color': '#1DA57A' },
  }),
  addWebpackPlugin(
    new MonacoWebpackPlugin({
      languages: ['json']
    })
  ),
);
