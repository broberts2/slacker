module.exports = (slackEvents, Actions) =>
  slackEvents.on("message", (event) =>
    !event.bot_id ? Actions.Message.send(event, "hello there!") : null
  );
