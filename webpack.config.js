module.exports = {
    entry:__dirname+'\\src\\entry.js',
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    },
    output:{
        path:__dirname+"/dist",
        filename:"bundle.js"
    },
    watch:true
}