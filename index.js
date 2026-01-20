#!/usr/bin/env node

const readline = require("readline");
const runSocial = require("./actions/social");

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

console.log(`\nTarget username: ${username}\n`);
console.log("[a] Social accounts");
console.log("[b] Internet username");
console.log("[c] Other info");
console.log("[d] Exit\n");

rl.question("Select option: ", async (choice) => {
  switch (choice.toLowerCase()) {
    case "a":
      await runSocial(username);
      break;
    case "b":
      console.log("B: coming soon");
      break;
    case "c":
      console.log("C: coming soon");
      break;
    case "d":
      console.log("Bye 👋");
      process.exit(0);
    default:
      console.log("Invalid option");
  }
  rl.close();
});
