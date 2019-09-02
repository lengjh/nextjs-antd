/* eslint-disable */
const withCss = require('@zeit/next-css');
const nextCss = require('@zeit/next-less');
const withPlugins = require('next-compose-plugins');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const exportPathMap = require("./routerMap");
const withImages = require('next-images');
const _nextCss = [
  nextCss,
  {
    cssModules: true,
  },
];
const _withCss = [
  withCss,
  {
    cssModules: false,
  },
];
const cndUrl = '';
const nextOption = {
  // exportPathMap,
  assetsPublicPath: './',
  // out: "./myout",
  assetPrefix: './',
  generateBuildId: async () => {
    // For example get the latest git commit hash here
    const date = new Date();
    const str = `${date.getFullYear()}${date.getMonth() +
      1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}-`;
    return `${str}${Math.random()
      .toString(36)
      .slice(2)}`;
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ];
      /*  只有在 build的时候 optimization.minimizer才存在，才可以push入uglifyPlugin*/
      if (!isServer && config.optimization && config.optimization.minimizer) {
        const uglifyPlugin = new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: isProd,
              // eslint-disable-next-line camelcase
              drop_debugger: isProd,
              // eslint-disable-next-line camelcase
              drop_console: isProd,
            },
          },
        });
        config.optimization.minimizer.push(uglifyPlugin);
      }
      try {
        config.optimization.splitChunks.cacheGroups.styles.chunks = 'async';
      } catch (ev) {
        console.log('--');
      }

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      });
    }
    // try {
    //   _config.optimization.splitChunks.cacheGroups.styles.chunks = 'async';
    // } catch (ev) {
    //   console.log('--');
    // }
    return config;
  },
};
module.exports = withPlugins([_nextCss, _withCss, withImages], nextOption);
