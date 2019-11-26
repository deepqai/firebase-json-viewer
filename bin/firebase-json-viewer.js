#!/usr/bin/env node

const program = require("commander");
const Server = require("../server");

program
  .option("-d, --database <url>", "Firebase database URL (https://myapp.firebaseio.com)")
  .option("-s, --serviceAccount <path>", "Optional, Firebase service account json file")
  .option("-t, --permanentToken <token>", "Optional, Firebase permanent token for accessing firebase-go-server")
  .parse(process.argv);

const { database, serviceAccount, permanentToken } = program;

if (!database) {
  program.outputHelp();
  return;
}

Server(database, serviceAccount, permanentToken);
