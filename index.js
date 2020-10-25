const { createServer } = require("http");
const config = require("./config");
const fs = require("fs");
const http = config.production ? require("https") : require("http");
const express = require("express");
const bodyParser = require("body-parser");
const { createEventAdapter } = require("@slack/events-api");
const { App, LogLevel } = require("@slack/bolt");
const slackSigningSecret = config.appCredentials.signingSecret;
const port = process.env.PORT || 7000;
const slackEvents = createEventAdapter(slackSigningSecret);
const routes = require("./routes/_");
const events = require("./events/_");
const app = express();

const SlackApp = new App({
  token: config.appCredentials.botUserOathAccessToken,
  signingSecret: config.appCredentials.signingSecret,
  logLevel: LogLevel.DEBUG,
});

const Actions = require("./actions/_")(SlackApp);

app.use("/slack/events", slackEvents.expressMiddleware());

app.use(bodyParser());

let server = null;

if (config.production) {
  const key = fs.readFileSync(
    "/etc/letsencrypt/live/www.arclight-react.arclight.cc/privkey.pem"
  );
  const cert = fs.readFileSync(
    "/etc/letsencrypt/live/www.arclight-react.arclight.cc/cert.pem"
  );
  const ca = fs.readFileSync(
    "/etc/letsencrypt/live/www.arclight-react.arclight.cc/chain.pem"
  );
  server = http.createServer({ key, cert, ca }, app);
} else {
  server = http.createServer(app);
}

server.listen(port, () => {
  console.log(`Listening for events on ${server.address().port}`);
});

events(slackEvents, Actions);
routes(app, Actions);
