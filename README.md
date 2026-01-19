# social-check

Check social media accounts by username from CLI.

---

## Installation

Install the package globally via npm (GitHub Packages):

```bash
npm install -g @khinmaungwin/social-check
```

---

## Usage

Run the CLI tool with a username argument to search social media accounts:

```bash
social-check <username>
```

---

## Example:

```bash
social-check kokhinmaungwin
```

---

## Output Example

```Plaintext
🔍 Searching accounts for: kokhinmaungwin

✖ Facebook   : Not found
✖ Twitter    : Not found
✔ GitHub     : https://github.com/kokhinmaungwin
✖ Instagram  : Not found
✖ Telegram   : Not found
```

---

## Development

If you want to run locally without installing globally:

```Bash
git clone https://github.com/khinmaungwin/social-check.git
cd social-check
npm install
npm link
social-check <username>
```

---

## License

ISC License © Khin Maung Win

---
