const fs = require('fs');
const dotenv = require('dotenv');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const [...argv] = process.argv.slice(2);


(async (envType) => {
  const dotEnvConfig = dotenv.parse(fs.readFileSync(`.env.${envType}`));

  if (dotEnvConfig) {
    for (let k in dotEnvConfig) {
      process.env[k] = dotEnvConfig[k];
    }
  }

  const webpackConfig = require(`../webpack.config.${envType}.js`)
  const compiler = Webpack(webpackConfig);

  if (process.env.NODE_ENV === 'development') {
    const devServerOptions = webpackConfig.devServer;
    const { port, host } = devServerOptions
    const server = new WebpackDevServer(compiler, devServerOptions);
    server.listen(port, '127.0.0.1', () => {
      console.log(`Starting server on http://${host}:${port}`);
    });
  }
  
  if (process.env.NODE_ENV === 'production') {
    compiler.run((err, stats) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(stats.toString({
        chunks: true,  // 使构建过程更静默无输出
        colors: true  
      }))
    })
  }
  
})(...argv)
