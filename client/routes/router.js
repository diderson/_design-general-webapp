var AmpersandRouter = require('ampersand-router');
var app = require('ampersand-app');

module.exports = AmpersandRouter.extend({
  routes: {
    'app.html': function () { 
      this.redirectTo('index.html');
    },
    '(*path)': function () {
      return this.redirectTo('index.html');
    }
  }
});