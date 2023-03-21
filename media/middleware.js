const cors = require('cors');

module.exports = {
  before: function(app) {
    app.use(cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    }));
  }
};