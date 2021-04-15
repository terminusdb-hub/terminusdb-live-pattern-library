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
    '@terminusdb-live/tdb-react-date-picker': {
      root: 'TBDReactDatePicker',
      commonjs2: '@terminusdb-live/tdb-react-date-picker',
      commonjs: '@terminusdb-live/tdb-react-date-picker',
      amd: 'TBDReactDatePicker',
    },
    '@terminusdb-live/react-chart': {
      root: 'ReactChart',
      commonjs2: '@terminusdb-live/react-chart',
      commonjs: '@terminusdb-live/react-chart',
      amd: 'ReactChart',
    },
    '@terminusdb-live/tdb-react-layout': {
      root: 'TDBReactLayout',
      commonjs2: '@terminusdb-live/tdb-react-layout',
      commonjs: '@terminusdb-live/tdb-react-layout',
      amd: 'TDBReactLayout',
    },
    '@terminusdb-live/tdb-react-button': {
      root: 'TDBReactButton',
      commonjs2: '@terminusdb-live/tdb-react-button',
      commonjs: '@terminusdb-live/tdb-react-button',
      amd: 'TDBReactButton',
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
