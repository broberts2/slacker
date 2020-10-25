module.exports = (app, Actions) =>
  app.post("/commands/woop", (req, res) => {
    Actions.Message.postImg(
      req.body.channel_id,
      "https://media.makeameme.org/created/can-i-get-fbugov.jpg",
      "Woop woop!",
      true
    );
    res.json(`'Woop Woop!' posted in channel: ${req.body.channel_id}.`);
  });
