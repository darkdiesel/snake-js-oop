const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ProgressPlugin = require('progress-webpack-plugin')

const devMode = process.env.NODE_ENV === "development";
const mode = devMode ? "development" : "production";

module.exports = {
    mode: mode,
    entry: {
        'ipa-snake-game.bundle': './src/js/ipa-snake-game.js',
        'ipa-snake-game.min': './src/scss/ipa-snake-game.scss',
    },
    output: {
        filename: path.join("js", "[name].js"),
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true,
        publicPath: '/dist/'
    },
    devtool: devMode ? "eval-source-map" : undefined,
    devServer: {
        static: {
            directory: path.join(__dirname, 'examples'),
        },
        client: {
            progress: true,
        },
        compress: true,
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) => {
                                return path.relative(path.dirname(resourcePath), context) + "/";
                            },
                        },
                    },
                    //devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                            sourceMap: devMode,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "postcss-import",
                                    "postcss-combine-duplicated-selectors",
                                    "postcss-flexbugs-fixes",
                                    "postcss-will-change",
                                    "postcss-merge-rules",
                                    "autoprefixer",
                                    "postcss-combine-media-query",
                                    "postcss-sort-media-queries",
                                ],
                            },
                            sourceMap: devMode,
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: devMode,
                        },
                    }
                ],
            },
            {
                test: /\.wav/,
                type: 'asset/resource',
                generator : {
                    filename : 'assets/audio/[name][ext][query]',
                    emit: false, //disable copy audio files
                }
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(
            {
                filename: path.join("css", "[name].css"),
                chunkFilename: path.join("css", "[id].css"),
                ignoreOrder: false, // Enable to remove warnings about conflicting order
            }
        ),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/audio'),
                    to: path.resolve(__dirname, 'dist/assets/audio'),
                },
            ],
        }),
        new ProgressPlugin(true),
        new RemoveEmptyScriptsPlugin(),
    ].concat(devMode ? [] : []),
    watch: devMode,
    watchOptions: {
        ignored: [
            "**/node_modules",
            "**/dist",
            "**/package.json",
            "**/package-lock.json",
            "**/tsconfig.json",
        ],
    },
    // optimization: {
    //     runtimeChunk: 'single',
    // }
};