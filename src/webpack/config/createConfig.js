const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MonetJSONPlugin = require('../plugin/MonetJSONPlugin');
const ZipPlugin = require('zip-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PlatformEnum = require('../../data/PlatformEnum');
const DevEnum = require('../../data/DevEnum');

const nodeModules = `${path.resolve(__dirname, '../../../node_modules')}/`;

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
  platform = 'unknown',
}) {
  let devtool = false;
  const entry = [];

  if (mode === DevEnum.PRODUCTION) {
    devtool = false;
  }

  if (mode === DevEnum.DEVELOPMENT) {
    devtool = 'inline-source-map';
  }

  // entry.push('@babel/polyfill');
  entry.push('whatwg-fetch');
  entry.push(filepathJs);

  const config = {
    mode,
    entry: {
      main: entry,
    },

    output: {
      path: outputPath,
      filename: './[name].js',
    },
    externals: {
      // gsap external
      TweenLite: 'TweenLite',
      TweenMax: 'TweenMax',
      TimelineLite: 'TimelineLite',
      TimelineMax: 'TimelineMax',

      // doubleclick and monet external
      Enabler: 'Enabler',
      Monet: 'Monet',
    },
    resolve: {
      modules: ['node_modules', nodeModules],
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
                name: '[name]_[sha512:hash:base64:7].css',
              },
            },
            {
              loader: 'extract-loader',
            },
            'css-loader', // translates CSS into CommonJS
            'sass-loader', // compiles Sass to CSS, using Node Sass by default
          ],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name]_[sha512:hash:base64:7].css',
              },
            },
            {
              loader: 'extract-loader',
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: loader => [
                  require('postcss-import')({ root: loader.resourcePath }),
                  require('postcss-preset-env')({
                    stage: 2,
                    features: {
                      'nesting-rules': true,
                    },
                    browsers: ['defaults', 'ie 11'],
                  }),
                  require('postcss-nested')(),
                  require('cssnano')(),
                ],
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
                name: '[name]_[sha512:hash:base64:7].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(gif|png|jpe?g)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name]_[sha512:hash:base64:7].[ext]',
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                optipng: {
                  enabled: true,
                },
                mozjpeg: {
                  progressive: true,
                  quality: 80,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4,
                },
                gifsicle: {
                  interlaced: false,
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
                    useBuiltIns: 'usage',
                    targets: {
                      browsers: ['ie 11', 'last 2 versions', 'safari >= 7'],
                    },
                  },
                ],
              ],
              plugins: [
                `@babel/plugin-proposal-class-properties`,
                `@babel/plugin-syntax-dynamic-import`,
                `@babel/plugin-transform-async-to-generator`,
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
          test: /\.(ttf|eot|woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name]_[sha512:hash:base64:7].[ext]',
            },
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

                attrs: [':src', ':href', 'netflix-video:source', ':data-src'],
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

      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(mode === DevEnum.PRODUCTION),
      }),
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
      new CopyWebpackPlugin([
        { from: path.resolve(path.dirname(filepathRichmediaRC), './static'), to: 'static' }
      ], {})
    ],
    stats: {
      colors: true,
    },
    devtool,
  };

  if (platform === PlatformEnum.MONET) {
    config.plugins.push(
      new MonetJSONPlugin({
        config: filepathRichmediaRC,
        filePattern: '[hash].[ext]',
      }),
    );
  }

  if (mode === DevEnum.DEVELOPMENT) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (mode === DevEnum.PRODUCTION) {
    config.plugins.push(
      new ZipPlugin({
        filename: 'bundle.zip',

        fileOptions: {
          mtime: new Date(),
          mode: 0o100664,
          compress: true,
          forceZip64Format: false,
        },

        zipOptions: {
          forceZip64Format: false,
        },
      }),
    );

    config.optimization = {
      minimize: true,
        minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            comments: false,
            mangle: false,
            compress: false,
          },
        }),
        new UglifyJsPlugin({
          include: /\.min\.js$/,
          sourceMap: false,
          uglifyOptions: {
            warnings: false,
            parse: {},
            compress: {},
            mangle: true, // Note `mangle.properties` is `false` by default.
            output: null,
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_fnames: false,
          },
        }),
      ],
    };
  }

  config.plugins.push(
    new SimpleProgressWebpackPlugin({
      format: 'compact',
    }),
  );

  return config;
};
