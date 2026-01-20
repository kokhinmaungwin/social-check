const axios = require("axios");

function generateVariations(username) {
  return [
    username,
    `${username}_`,
    `_${username}`,
    `${username}123`,
    `${username}01`,
    `${username}.`,
    `${username}.dev`,
    `${username}-dev`,
    `${username}-official`,
    `${username}_official`,
    `${username}__`,
    username.replace(/_/g, "."),
  ].filter((v, i, a) => a.indexOf(v) === i);
}

function analyzeUsername(username) {
  return {
    length: username.length,
    hasNumber: /\d/.test(username),
    hasUnderscore: username.includes("_"),
    hasDot: username.includes("."),
    lowercaseOnly: username === username.toLowerCase(),
    pattern: /^[a-z0-9._-]+$/.test(username) ? "simple" : "complex",
  };
}

async function quickGitHubCheck(name) {
  try {
    const res = await axios.head(`https://github.com/${name}`, {
      timeout: 3000,
      validateStatus: () => true,
    });
    return res.status !== 404;
  } catch {
    return false;
  }
}

function buildDiscoveryLinks(username) {
  return {
    google: `https://www.google.com/search?q="${username}"`,
    duckduckgo: `https://duckduckgo.com/?q="${username}"`,
    github: `https://www.google.com/search?q=site:github.com+"${username}"`,
    twitter: `https://www.google.com/search?q=site:twitter.com+"${username}"`,
    facebook: `https://www.google.com/search?q=site:facebook.com+"${username}"`,
    instagram: `https://www.google.com/search?q=site:instagram.com+"${username}"`,
    reddit: `https://www.google.com/search?q=site:reddit.com+"${username}"`,
    medium: `https://www.google.com/search?q=site:medium.com+"${username}"`,
    devto: `https://www.google.com/search?q=site:dev.to+"${username}"`,
    linkedin: `https://www.google.com/search?q=site:linkedin.com+"${username}"`,
  };
}

async function runIntel(username) {
  console.log(`\n🧠 Username intelligence + discovery for: ${username}\n`);

  // Metadata
  const meta = analyzeUsername(username);
  console.log("📊 Metadata");
  Object.entries(meta).forEach(([k, v]) =>
    console.log(`  • ${k.padEnd(14)} : ${v}`)
  );

  // Variations
  const variations = generateVariations(username);
  console.log(`\n🔁 Generated variations (${variations.length})`);
  variations.forEach(v => console.log(`  - ${v}`));

  // GitHub heuristic
  console.log("\n⚡ Quick presence check (GitHub heuristic)\n");
  const presence = {};
  for (const v of variations.slice(0, 8)) {
    const exists = await quickGitHubCheck(v);
    presence[v] = exists;
    console.log(
      exists
        ? `✔ ${v.padEnd(20)} : Possible usage`
        : `✖ ${v.padEnd(20)} : Free / unknown`
    );
  }

  // Internet discovery
  const discovery = buildDiscoveryLinks(username);

  console.log("\n🌐 Internet discovery links\n");
  Object.entries(discovery).forEach(([k, url]) => {
    console.log(`🔗 ${k.padEnd(10)} : ${url}`);
  });

  return {
    metadata: meta,
    variations,
    presence,
    discovery,
  };
}

module.exports = runIntel;
