const path = require('path')
/*const { config } = require('process')*/
const currenttask = process.env.npm_lifecycle_event
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugins = require('html-webpack-plugin')
const Fse = require('fs-extra')
const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer')
]

class RunAfterCompile{
    apply(compiler){
        compiler.hooks.done.tap('Copy images', function(){
            Fse.copySync('./app/assets/images','./docs/assets/images')
        })
    }
}

let cssConfig = {
    test: /\.css$/i,
    use: ['css-loader',{loader: 'postcss-loader', options: {postcssOptions:{plugins: postCSSPlugins}}}]
}
let pages = Fse.readdirSync('./app').filter(function(file){return file.endsWith('.html')}).map(function(page){
    return new HTMLWebpackPlugins({
        filename: page,
        template: `./app/${page}`
    })
}) 
let myConfig = {
    entry: './app/assets/Scripts/App.js',
    plugins: pages,
    module: {
        rules: [
            cssConfig
        ]
    }

}
if (currenttask =='dev'){
    cssConfig.use.unshift('style-loader')
    myConfig.output = {
        filename: 'bundled.js',
        path: path.resolve(__dirname,'app')
    }
    myConfig.devServer = {
        onBeforeSetupMiddleware: function(app, server){
            watchFiles:['./app/**/*.html']
        },
        static: {
            directory: path.join(__dirname, 'app'),
        },
        hot: true,
        port: 4950,
        host: '0.0.0.0'
    }
    myConfig.mode= 'development'
}
if (currenttask =='build'){
    myConfig.module.rules.push({
        test: /\.is$/,
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
            options:{
                presets:['@babel.presets-env']
            }
        }
    })
    cssConfig.use.unshift(MiniCSSExtractPlugin.loader)
    postCSSPlugins.push(require('cssnano'))
    myConfig.output = {
        /*filename: 'bundled.js',*/
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname,'docs')
    }
    myConfig.mode = 'production',
    myConfig.optimization = {
        splitChunks: {
          chunks: 'all',
        }
    }
    myConfig.plugins.push(
        new CleanWebpackPlugin(),
        new MiniCSSExtractPlugin({filename:'styles.[chunkhash].css'}),
        new RunAfterCompile()
        )
}


module.exports = myConfig