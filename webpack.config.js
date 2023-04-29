let { VueLoaderPlugin } = require('vue-loader');
let path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/PasswordChange/password-change.js',
    cache: {
        type: 'filesystem',
        allowCollectingMemory: true,
    },
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    },
    output: {
        path: path.resolve(__dirname, 'public', 'javascripts', 'PasswordChange'),
        filename: 'password-change.js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ]
}