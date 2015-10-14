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

    // the app config
    this.config = {
      rooturl: 'http://localhost:5984/general_webapp'
    }

    // wait for document ready to initialize the widgets
    domReady(function () {
      //init the widgets
      var GeneralView = require('./views/General');
      var GeneralModel = require('./models/General')
      var general     = new GeneralView({el: document.getElementById('area-global')});
      
      var model = new GeneralModel();

      model.fetch({
          success: function () {
              console.log('fetched!');
          },
          error: function () {
              console.log('failed');
          },
      })

      general.render({
        model: model
      })
    });
  }
});

// run it
module.exports.init();
