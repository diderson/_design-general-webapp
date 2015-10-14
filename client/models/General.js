var AmpersandModel = require('ampersand-model');
var app = require('ampersand-app');

module.exports = AmpersandModel.extend({
  url: app.config.rooturl + '/helloworldtext',
  modelType: 'General',
  props: {
    text: {
      type: 'string',
      required: true,
      default: 'loading!'
    },
    name: {
      type: 'string',
      required: false
    },
    firstName: {
      type: 'string',
      required: false
    }
  },
  session: {
    fontColor: 'string'
  },
  derived: {
    firstNameAndName: {
      deps: ['name', 'firstName'],
      fn: function () {
        return this.firstName + ' ' + this.name; 
      }
    }
  }
});