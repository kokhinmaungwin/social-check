#!/usr/bin/env node

const readline = require("readline");
const runSocial = require("./actions/social");
const runInternet = require("./actions/internet");
const runIntel = require("./actions/intel");
const runReport = require("./actions/report");

const args = process.argv.slice(2);
const username = args.find(a => !a.startsWith("-"));

if (!username) {
  console.log("Usage: social-check <username>");
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let collected = {}; // <-- Declare collected object here

console.log(`\nTarget username: ${username}\n`);
console.log("[a] Social accounts");
console.log("[b] Internet username");
console.log("[c] Other info");
console.log("[d] Full report");
console.log("[e] Exit\n");

rl.question("Select option: ", async (choice) => {
  switch (choice.toLowerCase()) {
    case "a":
      collected.social = await runSocial(username);
      break;
    case "b":
      collected.internet = await runInternet(username);
      break;
    case "c":
      collected.intel = await runIntel(username);
      break;
    case "d":
      await runReport(username, collected);
      break;
    case "e":
      console.log("Bye 👋");
      process.exit(0);
    default:
      console.log("Invalid option");
  }
  rl.close();
});
