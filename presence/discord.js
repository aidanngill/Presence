const RPC = require("discord-rpc");

const discordAppId = (
  process.env.DISCORD_APP_ID
  ? process.env.DISCORD_APP_ID
  : "855893326989361213"
);

RPC.register(discordAppId);
const rpcClient = new RPC.Client({ transport: "ipc" });

rpcClient.on("ready", () => {
  const user = rpcClient.user;
  console.log(`[Discord] Connected as ${user.username}#${user.discriminator}`);
});

rpcClient.login({
  clientId: discordAppId
}).catch(console.error);

module.exports = rpcClient;