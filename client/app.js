var AmpersandApp = require('ampersand-app');
var Router = require('./routes/router');
var domReady = require('domready');

module.exports = AmpersandApp.extend({
  init: function () {
    var self = window.app = this;

    // init URL handlers and the history tracker
    this.router = new Router();

    // the users session
    this.me = {};

    // wait for document ready to initialize the widgets
    domReady(function () {
      //init the widgets
      
    });
  }
});

// run it
module.exports.init();
