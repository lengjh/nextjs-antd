const autoprefixer = require('autoprefixer');
module.exports = {
  plugins: [
    autoprefixer({
      browsers: ['> 1%', 'last 4 versions', 'ie 8-11', 'Firefox > 20'],
    }),
  ],
};
