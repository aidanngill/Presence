// https://store.steampowered.com/app/394690/Tower_Unite/

module.exports = {
  steamID: 394690,
  gameTitle: "Tower Unite",
  processPresence: (data) => {
    const discordRp = {};
    discordRp.largeImageKey = "tu-logo-clean";

    if (data.map) {
      if (data.round && data.map !== "MainMenu") {
        discordRp.details = data.map;

        if (data.steam_display.includes("Waiting")) {
          discordRp.details += " (in lobby)";
        } else {
          discordRp.details += ` (${data.round}/${data.maxround})`;
        }
      }

      discordRp.state = data.status;
      discordRp.largeImageText = data.servername;
    }

    return discordRp;
  }
};