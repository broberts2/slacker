const config = require("../config");

module.exports = (SlackApp) => ({
  send: async (channel, text, asUser) => {
    const result = await SlackApp.client.chat.postMessage({
      token: asUser
        ? config.appCredentials.OathAccessToken
        : config.appCredentials.botUserOathAccessToken,
      channel,
      text,
      as_user: asUser ? asUser : false,
    });
  },
  postImg: async (channel, image_url, alt_text, asUser) => {
    const result = await SlackApp.client.chat.postMessage({
      token: asUser
        ? config.appCredentials.OathAccessToken
        : config.appCredentials.botUserOathAccessToken,
      channel,
      as_user: asUser ? asUser : false,
      blocks: [
        {
          type: "image",
          image_url,
          alt_text,
        },
      ],
    });
  },
});
