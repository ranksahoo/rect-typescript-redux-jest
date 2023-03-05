const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@components': path.resolve(__dirname, '..', 'src/components'),
      '@utils': path.resolve(__dirname, '..', 'src/utils'),
      '@types': path.resolve(__dirname, '..', 'src/types'),
      '@hooks': path.resolve(__dirname, '..', 'src/hooks'),
      '@context': path.resolve(__dirname, '..', 'src/context'),
      '@pages': path.resolve(__dirname, '..', 'src/pages'),
      '@styles': path.resolve(__dirname, '..', 'src/styles'),
      '@assets': path.resolve(__dirname, '..', 'src/assets'),
      '@auth': path.resolve(__dirname, '..', 'src/auth'),
      '@mocks': path.resolve(__dirname, '..', 'src/mocks'),
      '@types': path.resolve(__dirname, '..', 'src/types'),
      '@store': path.resolve(__dirname, '..', 'src/store'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './public/index.html'),
    }),
    // new CopyPlugin({
    //   patterns: [
    //     { from: 'source', to: 'dest' },
    //     { from: 'other', to: 'public' },
    //   ],
    // }),
  ],
}
