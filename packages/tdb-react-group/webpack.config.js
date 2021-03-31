const path = require('path');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                use:{
                    loader: "babel-loader",
                },
            },
        ]
    },   
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'tdb-react-group.min.js',
        sourceMapFilename: 'tdb-react-group.min.js.map',
        libraryTarget: 'umd',
        library: 'TDBReactGroup',
    },
    resolve: {
      alias: {
        "@terminusdb-live/react-worker":path.resolve('../react-worker/src/index.js'),
        "@terminusdb-live/react-pretty-printer":path.resolve('../react-pretty-printer/src/index.js'),
        react: path.resolve('./node_modules/react')
      },
      extensions: ['.js', '.jsx', '.json'],
    },
    externals: {
    '@terminusdb-live/react-worker': {
        root: 'ReactWorker',
        commonjs2: '@terminusdb-live/react-worker',
        commonjs: '@terminusdb-live/react-worker',
        amd: 'ReactWorker',
    },
    '@terminusdb-live/react-pretty-printer': {
      root: 'ReactPrettyPrint',
      commonjs2: '@terminusdb-live/react-pretty-printer',
      commonjs: '@terminusdb-live/react-pretty-printer',
      amd: 'ReactPrettyPrint',
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
