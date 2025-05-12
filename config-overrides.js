module.exports = {
  webpack: function override(config, env) {
    return config;
  },
  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      
      // Replace deprecated middleware options with setupMiddlewares
      delete config.onBeforeSetupMiddleware;
      delete config.onAfterSetupMiddleware;
      
      config.setupMiddlewares = (middlewares, devServer) => {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }
        return middlewares;
      };
      
      return config;
    };
  }
};
