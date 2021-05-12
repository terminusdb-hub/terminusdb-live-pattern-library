const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    module: {
      rules : [
       {
         test: /\.js$/,
         exclude: /node_modules/,
         use: {
           loader:"babel-loader",
           options:{
             sourceType: "unambiguous",
             presets: [
               ["@babel/preset-env"],
               "@babel/preset-react"
             ],
             plugins: [[
               "@babel/plugin-proposal-class-properties",
               {
                 "loose": true
               }
             ],"@babel/plugin-transform-react-jsx",
               "@babel/plugin-proposal-export-default-from","@babel/plugin-transform-regenerator",
             ["@babel/plugin-transform-runtime"]
             ]
           }
         },
       },
       {
         test: /\.(css|less)$/,
         use: [
           'style-loader',
           {
             loader: 'css-loader',
             options: {
               sourceMap: true,
             },
           },
           {
             loader: 'less-loader',
             options: {
               sourceMap: true,
             },
           },
         ],
       },
       {
         test: /\.(svg|jpg|gif|png)$/,
         use: [
           {
             loader: 'file-loader',
             options: {
               name: '[name].[ext]',
               //outputPath: "images",
               //publicPath: "images"
             }
           }
         ]
       },
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
           {
             loader: 'file-loader',
             options: {
               outputPath: (url, resourcePath, context) => {
                 //if(argv.mode === 'development') {
                   const relativePath = path.relative(context, resourcePath);
                   return `/${relativePath}`;
                 //}
                 //return `/assets/fonts/${path.basename(resourcePath)}`;
               }
             }
           }
         ]
       }
      ]
   },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'tdb-dashboard.min.js',
        sourceMapFilename: 'tdb-dashboard.min.js.map',
        libraryTarget: 'umd',
        library: 'TDBDASHBOARD',
    },
    resolve: {
      alias: {
        "@terminusdb-live/react-worker":path.resolve('../react-worker/src/index.js'),
        react: path.resolve('./node_modules/react')
      },
      fallback: {"https": false},
      extensions: ['.js', '.jsx', '.json', '.png'],
    },
}