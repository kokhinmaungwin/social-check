## social-check

A simple OSINT-style CLI tool to check publicly available social media accounts, internet presence, and username intelligence for any given username.

> ⚠️ This tool uses only publicly available information and is intended for educational, research, and ethical OSINT purposes.  
> ⚠️ Misuse of this tool for illegal or unethical activities is strictly discouraged.

---

## ✨ Features

- 🔍 Check social media accounts (GitHub, Twitter, Instagram, Facebook, Telegram)

- 🌐 Check internet presence (Reddit, Medium, Dev.to, StackOverflow, Pastebin, Keybase)

- 🧠 Username intelligence analysis (metadata, patterns, variations)

- 📊 Generate a combined correlation report (JSON)

- 💾 All reports are saved locally on your machine



---

## 📦 Installation

- Option 1: Install from source (recommended for development)

```bash
git clone https://github.com/yourusername/social-check.git
cd social-check
npm install
chmod +x index.js
npm link
```

- What these commands do:

- npm install → installs required dependencies

- chmod +x index.js → makes the CLI executable

- npm link → allows running social-check globally


---

- Option 2: Install globally via npm (if published)

```bash
npm install -g social-check
```

---

## 🚀 Usage

```bash
social-check <username>
```
- Example

```bash
social-check kokhinmaungwin
```

---

## 🧭 Interactive Menu

- After running the command, you will see an interactive menu:

```bash
Target username: kokhinmaungwin

[a] Social accounts
[b] Internet username
[c] Other info
[d] Full report
[e] Exit
```

- Menu Options Explained

- Option	Description

- [a] :Scan social media platforms (GitHub, Twitter, Instagram, Facebook, Telegram)
- [b]	:Check internet platforms (Reddit, Medium, Dev.to, StackOverflow, Pastebin, Keybase)
- [c]	:Username intelligence (metadata, variations, quick presence checks)
- [d]	:Generate and save a full correlation report (JSON)
- [e]	:Exit the program


---

## 🧪 Example Workflow

```bash
social-check kokhinmaungwin

Select option: a
✔ github     : https://github.com/kokhinmaungwin
✖ twitter    : Not found

Select option: b
✖ reddit     : Not found
✖ medium     : Not found

Select option: c
📊 Metadata
• length : 14
• pattern: simple

🔁 Variations (11)
- kokhinmaungwin
- kokhinmaungwin.dev

Select option: d
📊 Final Correlation Report
👤 Username       : kokhinmaungwin
🔗 Accounts found : 2
🔁 Variations     : 11
💾 Saved report   : ./reports/kokhinmaungwin-123456.json

Select option: e
Bye 👋
```

---

## 📁 Reports

- Reports are saved in the ./reports directory

- Format: JSON

- File name pattern:

```bash
<username>-<timestamp>.json
```

---

## 🔐 Privacy & Security

✅ This tool only accesses publicly available web pages

❌ It does NOT:

- Collect passwords, emails, phone numbers

- Access private or authenticated APIs

- Track users

- Upload data remotely


All scans are performed using simple HTTP requests to public URLs.


---

## ⚖️ Disclaimer (IMPORTANT)

This tool is provided for educational, research, and self-auditing purposes only.

- Do NOT use this tool for harassment, stalking, doxxing, or illegal surveillance

- Only scan usernames you own or have permission to investigate

- The author is not responsible for misuse or violations of privacy laws


By using this tool, you agree to take full responsibility for how it is used.


---

## 🛠 Development Notes

- Node.js >= 18 recommended

- Uses axios for HTTP requests

- No database, no remote logging


To relink after changes:
```bash
npm link --force
```

---

## 📜 License

ISC License © Khin Maung Win


---

## ⭐ Final Note

If you are learning OSINT, CLI tools, or Node.js automation — this project is a safe and ethical starting point when used responsibly.
