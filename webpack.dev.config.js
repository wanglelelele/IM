const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
console.log('merge', merge)
module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        port: 3000
    }
});
