import * as webpack from 'webpack';
import * as path from 'path';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';

const config: webpack.Configuration = {
  target: 'node',
  devtool: 'source-map',
  entry: {
    server: path.resolve(__dirname, './src/server.ts')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/views', to: 'views' },
      { from: './src/public', to: 'public' }
    ])
  ]
};

export default config;
