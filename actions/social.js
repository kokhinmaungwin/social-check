const axios = require("axios");
const chalk = require("chalk");

const socialPlatforms = {
  Facebook: "https://www.facebook.com/",
  GitHub: "https://github.com/",
  Twitter: "https://twitter.com/",
  Instagram: "https://www.instagram.com/",
  Telegram: "https://t.me/"
};

async function runSocial(username) {
  console.log(chalk.cyan(`\n🔍 Social accounts for: ${username}\n`));

  for (const [platform, baseUrl] of Object.entries(socialPlatforms)) {
    const url = baseUrl + username;

    try {
      const res = await axios.get(url, {
        timeout: 6000,
        validateStatus: () => true
      });

      if (res.status === 200) {
        console.log(chalk.green(`✔ ${platform.padEnd(10)} : ${url}`));
      } else {
        console.log(chalk.red(`✖ ${platform.padEnd(10)} : Not found`));
      }

    } catch {
      console.log(chalk.red(`✖ ${platform.padEnd(10)} : Error`));
    }
  }
}

module.exports = runSocial;
