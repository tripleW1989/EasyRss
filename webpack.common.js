const path = require('path');

module.exports = {
  entry: {
    background: path.join(__dirname, 'chrome/background.ts'),
  },
  output: {
    path: path.join(__dirname, 'extension/'),
    filename: '[name].js',
  },
  optimization: {
    minimize: false,
  },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
};
