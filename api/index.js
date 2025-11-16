const { app } = require('../dist/portafolio/server/main');

module.exports = (req, res) => {
  app().handle(req, res);
};
