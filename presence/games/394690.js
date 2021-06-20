// https://store.steampowered.com/app/394690/Tower_Unite/

module.exports = {
  steamID: 394690,
  gameTitle: "Tower Unite",
  processPresence: (data) => {
    const discordRp = {};

    discordRp.title = this.gameTitle;
    discordRp.largeImageKey = "tu-logo-clean";

    if (data.gameworld == "MainMenu") {
      discordRp.state = data.status;
      discordRp.largeImageText = "Main Menu";
    } else if (data.gamemode == "Lobby") {
      discordRp.state = data.status;
      discordRp.details = data.map;
      discordRp.state = data.status;
    } else if (data.map !== undefined) {
      let details = data.map;

      if (data.steam_display.includes("Waiting")) {
        details += " (in lobby)";
      } else {
        details += ` (${data.round}/${data.maxround})`;
      }

      discordRp.details = details;
      discordRp.state = data.status;
      discordRp.largeImageText = data.servername;
    }

    return discordRp;
  }
}