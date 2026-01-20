const fs = require("fs");
const path = require("path");

async function runReport(username, data) {
  const timestamp = new Date().toISOString();

  const report = {
    tool: "social-check",
    version: "1.0.0",
    generatedAt: timestamp,
    username,
    summary: {
      totalPlatforms: Object.keys(data.social || {}).length,
      foundAccounts: Object.values(data.social || {}).filter(Boolean).length,
      variationsChecked: data.intel?.variations?.length || 0,
    },
    data,
  };

  const reportDir = path.join(process.cwd(), "reports");
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
  }

  const filePath = path.join(
    reportDir,
    `${username}-${Date.now()}.json`
  );

  fs.writeFileSync(filePath, JSON.stringify(report, null, 2));

  console.log("\n📊 Final Correlation Report");
  console.log("────────────────────────────");

  console.log(`👤 Username       : ${username}`);
  console.log(
    `🔗 Accounts found : ${report.summary.foundAccounts}`
  );
  console.log(
    `🔁 Variations     : ${report.summary.variationsChecked}`
  );
  console.log(`💾 Saved report   : ${filePath}\n`);
}

module.exports = runReport;
