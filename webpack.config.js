const Copy = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './public/js/index.js',

  output: {
    filename: 'public/bundle.main.js',
    path: path.resolve(__dirname, 'dist')
  },

  optimization: {},
  plugins: [
    new Copy({
      patterns: [
        { from: './public/index.html', to: 'public/[name].[ext]' },
        { from: './public/styles', to: 'public/styles'},
        { from: './src', to: 'src' },
        { from: './data', to: 'data' }
      ]
    })
  ],

  watchOptions: {
    ignored: ['node_modules/**']
  }

}