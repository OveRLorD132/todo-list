let { VueLoaderPlugin } = require('vue-loader');
let path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/Registration/registration.js',
    output: {
        path: path.resolve(__dirname, 'public', 'javascripts', 'Registration'),
        filename: 'registration.js',
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