let { VueLoaderPlugin } = require('vue-loader');
let path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/Main/main.js',
    output: {
        path: path.resolve(__dirname, 'public', 'javascripts', 'Main'),
        filename: 'main.js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ]
}