const ROUTES = {
  webooks: [require("./webhooks/woop.js")],
};

module.exports = (app, Actions) =>
  Object.values(ROUTES).map((el) => el.map((fn) => fn(app, Actions)));
