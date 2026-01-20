const axios = require("axios");
const fs = require("fs");
const path = require("path");

const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36";

function getPlatforms(username) {
  return {
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
}

async function checkAccount(name, cfg) {
  try {
    const head = await axios.head(cfg.url, {
      timeout: 4000,
      validateStatus: () => true,
      headers: { "User-Agent": UA },
    });

    if (head.status === 404) {
      return { platform: name, exists: false };
    }

    const res = await axios.get(cfg.url, {
      timeout: 6000,
      validateStatus: () => true,
      headers: { "User-Agent": UA },
    });

    const exists = res.status === 200 && cfg.validate(res.data);

    return { platform: name, url: cfg.url, exists };
  } catch {
    return { platform: name, exists: false };
  }
}

async function runSocial(username, options = {}) {
  const platforms = getPlatforms(username);
  const checks = Object.entries(platforms).map(
    ([name, cfg]) => checkAccount(name, cfg)
  );

  const results = await Promise.all(checks);

  const jsonResult = { username, results: {} };
  results.forEach(r => {
    jsonResult.results[r.platform] = r.exists ? r.url : false;
  });

  if (!options.json) {
    console.log(`\n🔍 Social scan for: ${username}\n`);
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

  if (options.output) {
    const ext = path.extname(options.output);
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

    fs.writeFileSync(options.output, content);
    console.log(`\n💾 Saved to ${options.output}`);
  }
  return jsonResult;
}

module.exports = runSocial;
