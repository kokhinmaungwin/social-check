const https = require("https");

const platforms = {
  github: "https://github.com/",
  twitter: "https://twitter.com/",
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  reddit: "https://www.reddit.com/user/",
  devto: "https://dev.to/",
  medium: "https://medium.com/@",
};

function check(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      if (res.statusCode === 200) {
        resolve("Taken");
      } else if (res.statusCode === 404) {
        resolve("Available");
      } else {
        resolve("Unknown");
      }
      res.resume(); // consume response data to free up memory
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve("Unknown");
    });

    req.on("error", () => resolve("Unknown"));
  });
}

module.exports = async function runAvailability(username) {
  console.log(`\n🧪 Username availability check for: ${username}\n`);

  const results = {};

  for (const [platform, base] of Object.entries(platforms)) {
    const url = base + username;
    const status = await check(url);
    results[platform] = status;

    const icon =
      status === "Available" ? "✖" :
      status === "Taken" ? "✔" : "?";

    console.log(`${icon} ${platform.padEnd(12)} : ${status}`);
  }

  return results;
};
