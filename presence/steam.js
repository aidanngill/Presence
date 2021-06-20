const Steam = require("steam");
const SteamTotp = require("steam-totp");
const ByteBuffer = require("bytebuffer");
const VDF = require(require.resolve("steam") + ("\\..\\VDF.js"));
const yargs = require("yargs");

const localUtil = require("./util.js");
const discordClient = require("./discord.js");

const steamClient = new Steam.SteamClient();
const steamUser = new Steam.SteamUser(steamClient);

const allGames = localUtil.loadAllGames("games");

const argv = yargs(process.argv).argv;

steamClient.on("connected", () => {
  let data = {
    account_name: process.env.STEAM_USERNAME,
    password: process.env.STEAM_PASSWORD
  }

  if (argv.totp) {
    data.two_factor_code = argv.totp;
  } else if (process.env.STEAM_SECRET) {
    SteamTotp.getTimeOffset((authError, authOffset) => {
      if (authError !== null) {
        console.error(authError);
        authOffset = 0;
      }

      data.two_factor_code = SteamTotp.getAuthCode(
        process.env.STEAM_SECRET,
        authOffset
      );
    });
  }

  steamUser.logOn(data);
});

steamClient.on("disconnected", () => {
  console.error("[Steam] Failed to connect to Steam");
});

steamClient.on("logOnResponse", (resp) => {
  if (resp.eresult == Steam.EResult.OK) {
    console.log(`[Steam] Logged in as ${process.env.STEAM_USERNAME}`);

    allGames.forEach((game) => {
      game.rpc = new Steam.SteamRichPresence(steamClient, game.steamID);
      game.rpc.on("info", (data) => {
        data.rich_presence.forEach((event) => {
          if (event.steamid_user !== steamClient.steamID.toString())
            return;

          if (event.rich_presence_kv.byteLength === 0)
            return;

          const rpBuffer = data.rich_presence[0].rich_presence_kv;
          const rpWrapped = ByteBuffer.wrap(rpBuffer);
          const rpData = localUtil.lowerDictionary(VDF.decode(rpWrapped).RP);

          const discordRp = game.processPresence(rpData);
          discordClient.setActivity(discordRp);
        });
      });

      console.log(`[Steam] Loaded a configuration for ${game.gameTitle}`);
    });

    updateSteamPresences();
    setInterval(updateSteamPresences, 15e3);
  } else {
    console.error(`[Steam] Failed to login as ${process.env.STEAM_USERNAME}`);
  }
});

const updateSteamPresences = () => {
  allGames.forEach((game) => {
    game.rpc.request(steamClient.steamID.toString());
  });
}

module.exports = steamClient;