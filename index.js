require("dotenv").config();

const discordClient = require("./presence/discord.js");
const steamClient = require("./presence/steam.js");

const localUtil = require("./presence/util.js");

discordClient.login({ clientId: localUtil.discordAppId }).catch(console.error);
steamClient.connect();