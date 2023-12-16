import htmlPlugin from 'html-webpack-plugin';
import { resolve as _resolve, dirname } from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const htmlPluginCfg = new htmlPlugin({
  template: _resolve(__dirname, 'index.html'),
  filename: 'index.html',
  inject: 'body',
});

const tsconfigPathsPluginCfg = new TsconfigPathsPlugin();

export default {
  entry: './src/game.ts',
  output: {
    path: _resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|svg)/i,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        },
      },
      {
        test: /\.ts$/,
        include: _resolve(__dirname, 'src'),
        loader: 'ts-loader',
      },
      {
        test: _resolve('phaser'),
        loader: 'expose-loader',
        options: {
          exposes: {
            globalName: 'Phaser',
            override: true,
          },
        },
      },
    ],
  },
  plugins: [htmlPluginCfg],
  devServer: {
    static: _resolve(__dirname, './dist'),
    host: 'localhost',
    port: 8080,
    open: false,
    hot: true,
    watchFiles: ['src/**/*.ts', 'index.html'],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [tsconfigPathsPluginCfg],
  },
};
