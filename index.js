require("dotenv").config();

const steamClient = require("./presence/steam.js");
steamClient.connect();