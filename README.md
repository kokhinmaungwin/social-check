# social-check

A simple CLI tool to check social media accounts, internet presence, and username intelligence for any given username.

---

## Installation

### 1. Clone the repository (if using from source)

```bash
git clone https://github.com/yourusername/social-check.git
cd social-check
npm install
chmod +x index.js
npm link
```
- npm install will install all dependencies.
- chmod +x index.js makes the main script executable.
- npm link links the package globally so you can run social-check from anywhere.

### 2. Or install globally via npm (if published)

```bash
npm install -g social-check
```

---

## Usage

```bash
social-check <username>
```
- Example:
```bash
social-check kokhinmaungwin
```

---

## Interactive Menu Options

-After running the command, you will see a menu like this:

```bash
Target username: kokhinmaungwin

[a] Social accounts
[b] Internet username
[c] Other info
[d] Full report
[e] Exit

Select option:
```
# What each option does:

- a : Scan and show social media accounts (GitHub, Twitter, Instagram, Facebook, Telegram)
- b : Check internet presence on other platforms (Reddit, Medium, Dev.to, StackOverflow, Pastebin, Keybase)
- c : Show username intelligence, metadata, and username variations with presence check
- d : Generate and save a full correlation report of all collected data so far
- e : Exit the program

---

## Example Workflow

```bash
social-check kokhinmaungwin

Target username: kokhinmaungwin

[a] Social accounts
[b] Internet username
[c] Other info
[d] Full report
[e] Exit

Select option: a

🔍 Social scan for: kokhinmaungwin
✔ github     : https://github.com/kokhinmaungwin
✖ twitter    : Not found
✖ instagram  : Not found
✖ facebook   : Not found
✖ telegram   : Not found

Select option: b

🌐 Internet presence for: kokhinmaungwin
✖ reddit         : Not found
✖ medium         : Not found
✖ devto          : Not found
✖ stackoverflow  : Not found
✖ pastebin       : Not found
✖ keybase        : Not found

Select option: c

🧠 Username intelligence for: kokhinmaungwin
📊 Metadata
  • length         : 14
  • hasNumber      : false
  • hasUnderscore  : false
  • hasDot         : false
  • lowercaseOnly  : true
  • pattern        : simple

🔁 Generated variations (11)
  - kokhinmaungwin
  - kokhinmaungwin_
  - _kokhinmaungwin
  - kokhinmaungwin123
  - kokhinmaungwin01
  - kokhinmaungwin.
  - kokhinmaungwin.dev
  - kokhinmaungwin-dev
  - kokhinmaungwin-official
  - kokhinmaungwin_official
  - kokhinmaungwin__

⚡ Quick presence check (GitHub heuristic)
✔ kokhinmaungwin       : Possible usage
✖ kokhinmaungwin_      : Free / unknown
... (other entries)

Select option: d

📊 Final Correlation Report
────────────────────────────
👤 Username       : kokhinmaungwin
🔗 Accounts found : 2
🔁 Variations     : 11
💾 Saved report   : /path/to/your/social-check/reports/kokhinmaungwin-123456789.json

Select option: e
Bye 👋
```

---

## Notes

- Reports are saved in the /reports directory in the project folder.
- You can rerun scans any time by selecting the menu options.
- To overwrite any npm linked files if you get errors, use:

```bash
npm link --force
```

---

## Disclaimer

This tool only checks publicly available information.
It does NOT collect private data, passwords, emails, or personal messages.

Use this tool responsibly and ethically.
The author is not responsible for misuse or violations of privacy laws.

---

## License

ISC License © Khin Maung Win

---
