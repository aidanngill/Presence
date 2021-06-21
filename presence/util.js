const fs = require("fs");
const path = require("path");
const yargs = require("yargs");

const argv = yargs(process.argv).argv;

const discordAppId = (
  process.env.DISCORD_APP_ID
  ? process.env.DISCORD_APP_ID
  : "855893326989361213"
);

const lowerDictionary = (dict) => {
  let key, keys = Object.keys(dict);
  var n = keys.length;

  var newObj = {};

  while (n--) {
    key = keys[n];
    newObj[key.toLowerCase()] = dict[key];
  }

  return newObj;
}

const loadAllGames = (directory) => {
  let allGames = [];
  const normalizedPath = path.join(__dirname, directory);

  fs.readdirSync(normalizedPath).forEach((file) => {
    allGames.push(require(path.join(normalizedPath, file)));
  });

  return allGames;
}

module.exports = {
  lowerDictionary: lowerDictionary,
  loadAllGames: loadAllGames,
  discordAppId: discordAppId,
  argv: argv
};