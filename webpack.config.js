const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,

  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },

  devtool: `source-map`,

  devServer: {
    contentBase: path.join(__dirname, `public`), // Расположение сборки
    publicPath: 'http://localhost:8080/', // Веб адрес сборки
    compress: true, // Сжатие
    watchContentBase: true, // Автоматическая перезагрузка страницы
  }
};
