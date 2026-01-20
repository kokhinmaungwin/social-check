// utils/http.js
const axios = require("axios");

const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36";

const http = axios.create({
  timeout: 8000,
  headers: {
    "User-Agent": UA,
  },
  validateStatus: () => true, 
});

module.exports = http;
