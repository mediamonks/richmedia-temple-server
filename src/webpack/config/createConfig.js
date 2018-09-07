const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
// const PreloadWebpackPlugin = require('preload-webpack-plugin');
// const CircularDependencyPlugin = require('circular-dependency-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const Visualizer = require('webpack-visualizer-plugin');

const MonetJSONPlugin = require('../plugin/MonetJSONPlugin');
const ZipPlugin = require('zip-webpack-plugin');

const nodeModules = `${path.resolve(__dirname, '../../../node_modules')}/`;

// console.log(nodeModules);
/**
 *
 * @param {object} options
 * @param {string} options.filepathJs
 * @param {string} options.filepathHtml
 * @param {string} options.filepathRichmediaRC
 * @param {string} options.outputPath
 * @param {string} options.mode
 * @return {{mode: string, entry: *[], output: {path: *, filename: string}, externals: {TweenLite: string, TweenMax: string, TimelineLite: string, TimelineMax: string, Enabler: string, Monet: string}, resolve: {modules: string[], alias: {vendor: string}}, resolveLoader: {modules: string[], symlinks: boolean}, module: {rules: *[]}, plugins: *[], stats: {colors: boolean}, devtool: string}}
 */
module.exports = function createConfig({
  filepathJs,
  filepathHtml,
  filepathRichmediaRC,
  outputPath,
  mode = 'production',
}) {
  let devtool = 'inline-source-map';

  if (mode === 'production') {
    devtool = false;
  }

  console.log(outputPath);

  const config = {
    mode,
    entry: [`whatwg-fetch`, `promise-polyfill`, `webpack-hot-middleware/client`, filepathJs],

    output: {
      path: outputPath,
      filename: 'main.js',
    },
    externals: {
      // gsap external
      TweenLite: 'TweenLite',
      TweenMax: 'TweenMax',
      TimelineLite: 'TimelineLite',
      TimelineMax: 'TimelineMax',
      Enabler: 'Enabler',
      Monet: 'Monet',
    },
    resolve: {
      modules: ['node_modules', nodeModules],
      alias: {
        vendor: path.resolve(__dirname, '../../../vendor'),
      },
    },

    resolveLoader: {
      modules: ['node_modules', nodeModules],
      symlinks: true,
    },

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].css',
              },
            },
            {
              loader: 'extract-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.sketch$/,
          use: [
            {
              loader: 'sketch-loader',
            },
          ],
        },
        {
          test: /\.(mp4|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[hash].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[hash].[ext]',
              },
            },

            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65,
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4,
                },
                gifsicle: {
                  interlaced: false,
                },
                // the webp option will enable WEBP
                webp: {
                  quality: 75,
                },
              },
            },
          ],
        },
        {
          test: /\.js$/,
          // adding exception to libraries comming from @mediamonks namespace.
          exclude: /(?!(node_modules\/@mediamonks)|(node_modules\\@mediamonks))node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      browsers: ['ie 11', 'last 2 versions', 'safari >= 7'],
                    },
                  },
                ],
              ],
              plugins: [
                `@babel/plugin-proposal-class-properties`,
              ],
            },
          },
        },
        {
          test: /.richmediarc$/,
          exclude: /node_modules/,
          type: 'javascript/dynamic',
          use: {
            loader: path.resolve(path.join(__dirname, '../loader/RichmediaRCLoader.js')),
          },
        },

        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: false,

                attrs: ['img:src', 'video:src', 'link:href'],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: filepathHtml,
      }),
      //
      new MonetJSONPlugin({
        config: filepathRichmediaRC,
        filePattern: '[hash].[ext]',
      }),
      //
      // new PreloadWebpackPlugin(),
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(false),
      }),
      //
      new webpack.HotModuleReplacementPlugin(),
      //
      // new CircularDependencyPlugin({
      //   // exclude detection of files based on a RegExp
      //   exclude: /node_modules/,
      //   // add errors to webpack instead of warnings
      //   failOnError: true,
      //   // set the current working directory for displaying module paths
      //   cwd: process.cwd(),
      // }),
      //
      // new Visualizer({
      //   filename: './statistics.html',
      // }),
    ],
    stats: {
      colors: true,
    },
    devtool,
  };

  if (mode === 'production') {
    config.plugins.push(
      new ZipPlugin({
        // OPTIONAL: defaults to the Webpack output path (above)
        // can be relative (to Webpack output path) or absolute
        // path: '',

        // OPTIONAL: defaults to the Webpack output filename (above) or,
        // if not present, the basename of the path
        filename: 'bundle.zip',

        // OPTIONAL: defaults to 'zip'
        // the file extension to use instead of 'zip'
        // extension: 'ext',

        // OPTIONAL: defaults to the empty string
        // the prefix for the files included in the zip file
        // pathPrefix: 'relative/path',

        // OPTIONAL: defaults to the identity function
        // a function mapping asset paths to new paths
        // pathMapper: function(assetPath) {
        //    // put all pngs in an `images` subdir
        //    if (assetPath.endsWith('.png'))
        //       return path.join(path.dirname(assetPath), 'images', path.basename(assetPath));
        //    return assetPath;
        // },

        // OPTIONAL: defaults to including everything
        // can be a string, a RegExp, or an array of strings and RegExps
        // include: [/\.js$/],

        // OPTIONAL: defaults to excluding nothing
        // can be a string, a RegExp, or an array of strings and RegExps
        // if a file matches both include and exclude, exclude takes precedence
        // exclude: [/\.png$/, /\.html$/],

        // yazl Options

        // OPTIONAL: see https://github.com/thejoshwolfe/yazl#addfilerealpath-metadatapath-options
        fileOptions: {
          mtime: new Date(),
          mode: 0o100664,
          compress: true,
          forceZip64Format: false,
        },

        // OPTIONAL: see https://github.com/thejoshwolfe/yazl#endoptions-finalsizecallback
        zipOptions: {
          forceZip64Format: false,
        },
      }),
    );
  }

  return config;
};
