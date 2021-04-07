const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    plugins: [
       new MiniCssExtractPlugin({
        filename: 'react-dates/lib/css/_datepicker.css',
       }),
    ],
    module: {
        rules: [
            {
                test: /\.js$|jsx/,
                use:{
                    loader: "babel-loader",
                },
            },
            {
              test: /\.(css|less)$/,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader', 'less-loader'
              ],
            },
            {
              test: /\.(svg|jpg|gif|png)$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: 'assets/images/[name].[ext]',
                  }
                }
              ]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'tdb-react-date-picker.min.js',
        sourceMapFilename: 'tdb-react-date-picker.min.js.map',
        libraryTarget: 'umd',
        library: 'TDBReactDatePicker',
    },
    resolve: {
      alias: {
        "@terminusdb-live/react-worker":path.resolve('../react-worker/src/index.js'),
      },
      extensions: ['.js', '.jsx', '.json', '.css', '.less'],
    },
    externals: {
    '@terminusdb-live/react-worker': {
        root: 'ReactWorker',
        commonjs2: '@terminusdb-live/react-worker',
        commonjs: '@terminusdb-live/react-worker',
        amd: 'ReactWorker',
    },
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    },
    'prop-types': {
      root: 'PropTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types',
    }
  },
}
