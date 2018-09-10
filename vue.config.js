module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.font\.js/,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'webfonts-loader',
                            options: {
                                fileName: utils.assetsPath('fonts/[fontname].[chunkhash].[ext]'),
                            }
                        }
                    ]
                }
            ]
        }
    }
}
