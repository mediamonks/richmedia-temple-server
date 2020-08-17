const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const DevEnum = require('../../data/DevEnum');
const flattenObjectToCSSVars = require("../../util/flattenObjectToCSSVars");

const nodeModules = `${path.resolve(__dirname, '../../../node_modules')}/`;

/**
 *
 * @param {object} options
 * @param {string} options.filepathJs
 * @param {string} options.filepathHtml
 * @param {string} options.filepathRichmediaRC
 * @param {string} options.outputPath
 * @param {string} options.mode
 * @param {any} options.richmediarc
 * @return {{mode: string, entry: *[], output: {path: *, filename: string}, externals: {TweenLite: string, TweenMax: string, TimelineLite: string, TimelineMax: string, Enabler: string, Monet: string}, resolve: {modules: string[], alias: {vendor: string}}, resolveLoader: {modules: string[], symlinks: boolean}, module: {rules: *[]}, plugins: *[], stats: {colors: boolean}, devtool: string}}
 */
module.exports = function createConfig({
  filepathJs,
  filepathHtml,
  filepathRichmediaRC,
  outputPath,
  richmediarc = null,

  options: { mode = DevEnum.DEVELOPMENT, stats = false } = {
    mode: DevEnum.DEVELOPMENT,
    stats: false,
  },
}) {
  let devtool = false;
  const entry = [];

  if (mode === DevEnum.PRODUCTION) {
    devtool = false;
  }

  if (mode === DevEnum.DEVELOPMENT) {
    devtool = 'inline-source-map';
  }

  let namedHashing = '_[sha512:hash:base64:7]';
  let imageNameHashing = namedHashing;

  if (richmediarc && richmediarc.settings) {
    if (richmediarc.settings.useOriginalImageName) {
      imageNameHashing = '';
    }

    if (richmediarc.settings.useOriginalFileNames) {
      namedHashing = '';
      imageNameHashing = '';
    }
  }

  console.log('cssVariables');

  const cssVariables = flattenObjectToCSSVars(richmediarc);

  console.log({
    richmediarc,
    cssVariables
  });

  // entry.push('@babel/polyfill');
  entry.push('whatwg-fetch');
  entry.push(filepathJs);

  console.log({
    entry, outputPath
  });
  const config = {
    mode,
    entry: {
      main: entry,
    },

    output: {
      filename: './[name].js',
      path: outputPath,
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
        // {
        //   test: /\.scss$/,
        //   use: [
        //     {
        //       loader: 'file-loader',
        //       options: {
        //         name: `[name]${namedHashing}.css`,
        //       },
        //     },
        //     {
        //       loader: 'extract-loader',
        //     },
        //     'css-loader', // translates CSS into CommonJS
        //     'sass-loader', // compiles Sass to CSS, using Node Sass by default
        //   ],
        // },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: `[name]${namedHashing}.css`,
              },
            },
            {
              loader: 'extract-loader',
            },
            'resolve-url-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: `[name]${namedHashing}.css`,
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
                  require('postcss-css-variables')({
                    variables: cssVariables
                  }),
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
                name: `[name]${namedHashing}.[ext]`,
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
                name: `[name]${imageNameHashing}.[ext]`,
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
          // adding exception to libraries coming from @mediamonks namespace.
          exclude: /(?!(node_modules\/@mediamonks)|(node_modules\\@mediamonks))node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: 3,
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
              name: `[name]${namedHashing}.[ext]`,
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
        DEVELOPMENT: JSON.stringify(mode === DevEnum.DEVELOPMENT),
        PRODUCTION: JSON.stringify(mode === DevEnum.PRODUCTION),
        __RICHMEDIA_CONFIG: JSON.stringify(richmediarc),
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
    ],
    stats: {
      colors: true,
    },
    devtool,
  };

  /**
   * When there is a static folder use it in webpack config
   */
  const staticPath = path.resolve(path.dirname(filepathRichmediaRC), './static');

  if (fs.existsSync(staticPath)) {
    config.plugins.push(new CopyWebpackPlugin([{ from: staticPath, to: './' }], {}));
  }

  if (stats === true) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  console.log(mode);
  if (mode === DevEnum.DEVELOPMENT) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (mode === DevEnum.PRODUCTION) {
    let bundleName = 'bundle.zip';

    // if (
    //   richmediarc &&
    //   richmediarc.settings &&
    //   richmediarc.settings.size &&
    //   richmediarc.settings.size.width &&
    //   richmediarc.settings.size.height
    // ) {
    //   bundleName = `${richmediarc.settings.size.width}x${richmediarc.settings.size.height}.zip`;
    // }

    config.plugins.push(
      new ZipPlugin({
        filename: bundleName,

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
      splitChunks: {
        // include all types of chunks
        chunks: 'async',
      },
      minimizer: [
        // new TerserPlugin()
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            // parse: {},
            compress: {
              arguments: true,
              booleans: true,
              collapse_vars: !true,
              comparisons: true,
              conditionals: true,
              dead_code: true,
              directives: true,
              drop_console: false,
              drop_debugger: true,
              evaluate: true,
              expression: false,
              global_defs: false,
              hoist_funs: false,
              hoist_props: true,
              hoist_vars: false,
              ie8: false,

              if_return: true,
              inline: true,
              join_vars: true,
              keep_fargs: 'strict',
              keep_fnames: false,
              keep_infinity: false,
              loops: true,
              negate_iife: true,
              passes: 1,
              properties: true,
              pure_getters: 'strict',
              pure_funcs: null,
              reduce_funcs: true,
              reduce_vars: true,
              sequences: true,
              side_effects: true,
              switches: true,
              top_retain: null,
              toplevel: false,
              typeofs: true,
              unsafe: false,
              unsafe_comps: false,
              unsafe_Function: false,
              unsafe_math: false,
              unsafe_proto: false,
              unsafe_regexp: false,
              unsafe_undefined: false,
              unused: true,
            },
            mangle: true, // Note `mangle.properties` is `false` by default.
            output: null,
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_fnames: true,
          },
        }),
      ],
    };

    // delete config.optimization;
  }

  config.plugins.push(
    new SimpleProgressWebpackPlugin({
      format: 'compact',
    }),
  );

  return config;
};
