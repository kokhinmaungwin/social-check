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
    pattern:
      /^[a-z0-9._-]+$/.test(username)
        ? "simple"
        : "complex",
  };
}

async function quickExistCheck(name) {
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

async function runIntel(username) {
  console.log(`\n🧠 Username intelligence for: ${username}\n`);

  // 🔍 Metadata
  const meta = analyzeUsername(username);

  console.log("📊 Metadata");
  Object.entries(meta).forEach(([k, v]) => {
    console.log(`  • ${k.padEnd(14)} : ${v}`);
  });

  // 🔁 Variations
  const variations = generateVariations(username);

  console.log(`\n🔁 Generated variations (${variations.length})`);
  variations.forEach(v => console.log(`  - ${v}`));

  // ⚡ Quick presence test
  console.log("\n⚡ Quick presence check (GitHub heuristic)\n");

  for (const v of variations.slice(0, 8)) {
    const exists = await quickExistCheck(v);
    console.log(
      exists
        ? `✔ ${v.padEnd(20)} : Possible usage`
        : `✖ ${v.padEnd(20)} : Free / unknown`
    );
  }
}

module.exports = runIntel;
