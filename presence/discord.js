const RPC = require("discord-rpc");
const localUtil = require("./util.js");

RPC.register(localUtil.discordAppId);
const rpcClient = new RPC.Client({ transport: "ipc" });

rpcClient.on("ready", () => {
  const user = rpcClient.user;
  console.log(`[Discord] Connected as ${user.username}#${user.discriminator}`);
});

module.exports = rpcClient;