#!/usr/bin/env node

const readline = require("readline");
const runSocial = require("./actions/social");
const runInternet = require("./actions/internet");
const runIntel = require("./actions/intel");
const runReport = require("./actions/report");
const runAvailability = require("./actions/availability");
const pkg = require("./package.json");

const args = process.argv.slice(2);

/* =========================
   Flags
========================= */
if (args.includes("--help")) {
  console.log(`
social-check - Ethical OSINT Username Checker

Usage:
  social-check <username> [options]

Options:
  --help        Show this help message
  --version     Show tool version
  --full        Run all scans and generate report
  --json        Output collected data as JSON

Menu:
  [a] Social accounts
  [b] Internet presence
  [c] Username intelligence
  [d] Full report
  [e] Username availability
  [f] Exit
`);
  process.exit(0);
}

if (args.includes("--version")) {
  console.log(`social-check v${pkg.version}`);
  process.exit(0);
}

/* =========================
   Username
========================= */
const argv = process.argv.slice(2);
const username = argv.find(a => !a.startsWith("-"));

if (!username) {
  console.log("Usage: social-check <username>");
  process.exit(1);
}

/* =========================
   Modes
========================= */
const isFull = args.includes("--full");
const isJson = args.includes("--json");

let collected = {};

/* =========================
   Full / Non-interactive
========================= */
(async () => {
  if (isFull) {
    collected.social = await runSocial(username);
    collected.internet = await runInternet(username);
    collected.intel = await runIntel(username);
    await runReport(username, collected);

    if (isJson) {
      console.log(JSON.stringify(collected, null, 2));
    }

    process.exit(0);
  }

  startInteractive();
})();

/* =========================
   Interactive Menu
========================= */
function startInteractive() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function showMenu() {
    console.log(`\nTarget username: ${username}\n`);
    console.log("[a] Social accounts");
    console.log("[b] Internet username");
    console.log("[c] Username intelligence + discovery");
    console.log("[d] Full report");
    console.log("[e] Username availability");
    console.log("[f] Exit\n");

    rl.question("Select option: ", async (choice) => {
      switch (choice.toLowerCase()) {
        case "a":
          collected.social = await runSocial(username);
          showMenu();
          break;

        case "b":
          collected.internet = await runInternet(username);
          showMenu();
          break;

        case "c":
          collected.intel = await runIntel(username);
          showMenu();
          break;

        case "d":
          await runReport(username, collected);
          showMenu();
          break;

        case "e":
          collected.availability = await runAvailability(username);
          showMenu();
          break;

        case "f":
          console.log("Bye 👋");
          rl.close();
          process.exit(0);

        default:
          console.log("Invalid option");
          showMenu();
      }
    });
  }

  showMenu();
}
