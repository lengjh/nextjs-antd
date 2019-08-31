/* eslint-disable */
const withCss = require("@zeit/next-css");
const nextCss = require("@zeit/next-less");
const withPlugins = require("next-compose-plugins");
// const exportPathMap = require("./routerMap");
const _nextCss = [
  nextCss,
  {
    cssModules: true
  }
];
const _withCss = [
  withCss,
  {
    cssModules: false
  }
];
const nextOption = {
  // exportPathMap,
  // assetsPublicPath: "./",
  // out: "./myout",
  // assetPrefix: "./",
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === "function") {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === "function" ? [] : origExternals)
      ];
      try {
        config.optimization.splitChunks.cacheGroups.styles.chunks = 'async';
      } catch (ev) {
        console.log('--');
      }
      config.module.rules.unshift({
        test: antStyles,
        use: "null-loader"
      });
    }
    return config;
  }
};
module.exports = withPlugins([_nextCss, _withCss], nextOption);
