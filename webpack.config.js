const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");

const isDev = process.env.NODE_ENV === "development";
const mode = isDev ? "development" : "production";

module.exports = {
    mode: mode,
    entry:{
        'ipa-snake-game.bundle.js': './src/js/ipa-snake-game.js',
        'ipa-snake-game.min.css': './src/sass/ipa-snake-game.scss',
    },
    output: {
        filename: path.join("js", "[name]"),
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'images/[hash][ext][query]',
        clean: true,
    },
    devtool: isDev ? "eval-source-map" : undefined,
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                            sourceMap: isDev,
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
                            sourceMap: isDev,
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: isDev,
                        },
                    }
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: path.join("css", "ipa-snake-game.min.css"),
        }),
        new RemoveEmptyScriptsPlugin(),
    ],
    watch: isDev,
    watchOptions: {
        ignored: [
            "**/node_modules",
            "**/dist",
            "**/package.json",
            "**/package-lock.json",
            "**/tsconfig.json",
        ],
    },
};