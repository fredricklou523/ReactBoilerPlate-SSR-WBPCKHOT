/* eslint no-console:0 */
require("babel-register");

const express = require("express");
const React = require("react");
const ReactDomServer = require("react-dom/server");
const ReactRouter = require("react-router-dom");
const _ = require("lodash");
const fs = require("fs");
const webpackDevMiddleWare = require("webpack-dev-middleware");
const webpackHOtMiddleware = require("webpack-hot-middleware");
const compression = require("compression");
const webpack = require("webpack");
const config = require("../webpack.config");
const App = require("../src/components/App").default;

const StaticRouter = ReactRouter.StaticRouter;
const port = 1337;
const baseTemplate = fs.readFileSync("index.html");
const template = _.template(baseTemplate);

const server = express();
server.use(compression());
if (process.env.NODE_ENV === "development") {
  const compiler = webpack(config);
  server.use(
    webpackDevMiddleWare(compiler, {
      publicPath: config.output.publicPath
    })
  );
  server.use(webpackHOtMiddleware(compiler));
}
server.use("/public", express.static("../public"));

server.use((req, res) => {
  const context = {};
  const body = ReactDomServer.renderToString(
    React.createElement(
      StaticRouter,
      { location: req.url, context },
      React.createElement(App)
    )
  );
  if (context.url) {
    res.redirect(301, context.url);
  }

  res.write(template({ body }));
  res.end();
});

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
