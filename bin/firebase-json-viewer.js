#!/usr/bin/env node

const program = require("commander");
const Server = require("../server");

program
  .option("-d, --database <url>", "Firebase database URL (https://myapp.firebaseio.com)")
  .option("-t, --permanentToken <token>", "Optional, Firebase permanent token for accessing firebase")
  .parse(process.argv);

const { database, permanentToken } = program;

if (!database) {
  program.outputHelp();
  return;
}

Server(database, permanentToken);
