module.exports = (SlackApp) => ({
  Message: require("./message")(SlackApp),
});
