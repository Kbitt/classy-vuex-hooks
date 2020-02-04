/**
 * @typedef { import("@types/webpack").Configuration } Configuration
 */
const path = require('path')
const r = p => path.resolve(__dirname, p)
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

/**
 * @type { Configuration }
 */
module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
    entry: r('src/index.ts'),
    output: {
        libraryTarget: 'commonjs',
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.ts'],
    },
    externals: {
        '@vue/composition-api': '@vue/composition-api',
        'classy-vuex': 'classy-vuex',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'babel-loader',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!*.d.ts'],
        }),
    ],
}
