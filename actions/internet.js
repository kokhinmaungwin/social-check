const axios = require("axios");

const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36";

function getInternetSites(username) {
  return {
    reddit: {
      url: `https://www.reddit.com/user/${username}`,
      validate: html => !html.includes("Sorry, nobody on Reddit"),
    },
    medium: {
      url: `https://medium.com/@${username}`,
      validate: html => !html.includes("404"),
    },
    devto: {
      url: `https://dev.to/${username}`,
      validate: html => !html.includes("Page not found"),
    },
    stackoverflow: {
      url: `https://stackoverflow.com/users/story/${username}`,
      validate: html => !html.includes("Page not found"),
    },
    pastebin: {
      url: `https://pastebin.com/u/${username}`,
      validate: html => !html.includes("User does not exist"),
    },
    keybase: {
      url: `https://keybase.io/${username}`,
      validate: html => !html.includes("Not found"),
    },
  };
}

async function checkSite(name, cfg) {
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

async function runInternet(username) {
  console.log(`\n🌐 Internet presence for: ${username}\n`);

  const sites = getInternetSites(username);
  const checks = Object.entries(sites).map(
    ([name, cfg]) => checkSite(name, cfg)
  );

  const results = await Promise.all(checks);

  results.forEach(r => {
    console.log(
      r.exists
        ? `✔ ${r.platform.padEnd(14)} : ${r.url}`
        : `✖ ${r.platform.padEnd(14)} : Not found`
    );
  });
  return results;
}

module.exports = runInternet;
