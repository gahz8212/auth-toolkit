const SSE = require("sse");
module.exports = (app, server) => {
  const sse = new SSE(server);
  sse.on("connection", (client) => {
    // app.set("client", client);
    setInterval(() => {
      client.send(Date.now().toString());
    }, 100);
  });
};
