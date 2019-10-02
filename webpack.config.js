const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,

  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },

  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`],
    }),
  ],

  devtool: `source-map`,

  devServer: {
    contentBase: path.join(__dirname, `public`), // Расположение сборки
    publicPath: 'http://localhost:8080/', // Веб адрес сборки
    compress: true, // Сжатие
    watchContentBase: true, // Автоматическая перезагрузка страницы
  }
};
