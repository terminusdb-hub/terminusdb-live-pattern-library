//const path = require('path');
//const Dotenv = require('dotenv-webpack');

/*module.exports = {
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
    }
}
*/

const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
//const CopyWebPackPlugin= require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => ({
  entry: [
    path.join(__dirname, './src/index.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "tdb-dashboard.min.js",
    publicPath: './'
  },
  devtool:argv.mode === 'production' ? false : '#inline-source-map',
  plugins: [
    new Dotenv({path: path.resolve(__dirname, '.env')}),
    new HtmlWebPackPlugin({
        inject: true,
        template: path.resolve(__dirname, './src/index.html'),
        bundleFileName:"tdb-dashboard.min.js"
      }),
     new MiniCssExtractPlugin({
      filename: 'tdb-dashboard.main.css',
     }),
   


  //{ chunks:["contact", "vendor"], template: "src/pages/contact.html",  filename: "contact.html"}
   /*new HtmlWebPackPlugin({
      chunks:["bundle"],
      template: path.join(__dirname, '..' , 'console/index.html'),
      filename: 'index.html'
    }),*/
  ],
  resolve: {
    alias: {
      "@terminusdb/terminusdb-react-components": path.resolve('../../../terminusdb-react-components/src/index.js'),
      "@terminusdb/terminusdb-client": path.resolve('../../../terminusdb-client/index.js'),
      "@terminusdb-live/react-worker":path.resolve('../react-worker/src/index.js'),
      "@terminusdb-live/tdb-react-group": path.join(__dirname, '..', 'src/index.js'),
      "@terminusdb-live/react-chart": path.resolve('../react-chart/src/index.js'),
      "@terminusdb-live/react-pretty-print": path.resolve('../react-pretty-print/src/index.js'),
      "@terminusdb-live/tdb-react-layout": path.resolve('../tdb-react-layout/src/index.js'),
      react: path.resolve('./node_modules/react')
    },
    fallback: { "https": false },
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader:"babel-loader",
          options:{
            presets: [
              ["@babel/preset-env"],
              "@babel/preset-react"
            ],
          }
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
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: (url, resourcePath, context) => {
                return `assets/fonts/${path.basename(resourcePath)}`;
              }
            }
          }
        ]
      }]
    },
    /*optimization: {
      minimize: argv.mode === 'production' ? true : false,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: "initial",
            name: "vendor",
            enforce: true
          }
        }
      }
    }*/
});
