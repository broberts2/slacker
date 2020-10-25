module.exports = (slackEvents, Actions) => ({
  onMessage: require("./onMessage")(slackEvents, Actions),
});
