const path = require("path");
const express = require("express");
const compression = require("compression");
const favicon = require("serve-favicon");
const serveStatic = require("serve-static");
const { google } = require("googleapis");
const admin = require("firebase-admin");

const Server = (database, token) => {
  let cachedToken = null;
  const getToken = () => {
    return Promise.resolve(token)
  };

  const app = express();
  const port = 8080;
  const serveDir = path.join(__dirname, "build");
  const fallbackPage = "index.html";

  app.use(compression());
  app.use(favicon(path.join(serveDir, "favicon.ico")));
  app.use(serveStatic(serveDir, { extensions: ["html"] }));
  app.get("/token", (req, res) => {
    getToken().then(token => {
      res.send(token);
    });
  });
  app.get("/database", (req, res) => {
    res.send(database);
  });
  app.get("*", (_, res) => res.sendFile(path.join(serveDir, fallbackPage)));

  app.listen(port, err => {
    if (err) {
      return console.error(err);
    }
    return console.log(`Listening at http://localhost:${port}`);
  });
};

module.exports = Server;
