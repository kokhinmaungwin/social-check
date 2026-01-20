#!/usr/bin/env node

const axios = require("axios");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const username = args.find(a => !a.startsWith("-"));
const isJson = args.includes("--json");

const outputIndex = args.indexOf("-o");
const outputFile = outputIndex !== -1 ? args[outputIndex + 1] : null;

if (!username) {
  console.log("Usage: social-check <username> [--json] [-o file]");
  process.exit(1);
}

const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36";

const platforms = {
  github: {
    url: `https://github.com/${username}`,
    validate: html =>
      html.includes("repositories") || html.includes("Overview"),
  },
  twitter: {
    url: `https://twitter.com/${username}`,
    validate: html =>
      !html.includes("This account doesn’t exist"),
  },
  instagram: {
    url: `https://www.instagram.com/${username}/`,
    validate: html =>
      html.includes("profilePage") && !html.includes("Sorry, this page"),
  },
  facebook: {
    url: `https://www.facebook.com/${username}`,
    validate: html =>
      !html.includes("content not available"),
  },
  telegram: {
    url: `https://t.me/${username}`,
    validate: html =>
      !html.includes("If you have Telegram"),
  },
};

async function checkAccount(name, cfg) {
  try {
    // 🔹 HEAD request first
    const head = await axios.head(cfg.url, {
      timeout: 4000,
      validateStatus: () => true,
      headers: { "User-Agent": UA },
    });

    if (head.status === 404) {
      return { platform: name, exists: false };
    }

    // 🔹 Fallback to GET + content validation
    const res = await axios.get(cfg.url, {
      timeout: 6000,
      validateStatus: () => true,
      headers: { "User-Agent": UA },
    });

    const exists =
      res.status === 200 && cfg.validate(res.data);

    return {
      platform: name,
      url: cfg.url,
      exists,
    };
  } catch {
    return { platform: name, exists: false };
  }
}

(async () => {
  const checks = Object.entries(platforms).map(
    ([name, cfg]) => checkAccount(name, cfg)
  );

  const results = await Promise.all(checks);

  const jsonResult = { username, results: {} };

  results.forEach(r => {
    jsonResult.results[r.platform] = r.exists ? r.url : false;
  });

  // 🖥️ Terminal output
  if (!isJson) {
    console.log(`🔍 OSINT scan for: ${username}\n`);
    results.forEach(r => {
      console.log(
        r.exists
          ? `✔ ${r.platform.padEnd(10)} : ${r.url}`
          : `✖ ${r.platform.padEnd(10)} : Not found`
      );
    });
  } else {
    console.log(JSON.stringify(jsonResult, null, 2));
  }

  // 💾 File output
  if (outputFile) {
    const ext = path.extname(outputFile);
    const content =
      ext === ".json"
        ? JSON.stringify(jsonResult, null, 2)
        : results
            .map(r =>
              r.exists
                ? `✔ ${r.platform} : ${r.url}`
                : `✖ ${r.platform} : Not found`
            )
            .join("\n");

    fs.writeFileSync(outputFile, content);
    console.log(`\n💾 Saved to ${outputFile}`);
  }
})();
