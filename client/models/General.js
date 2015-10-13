var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
  modelType: 'General',
  props: {
    text: {
      type: 'string',
      required: true
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
  derived: {
    firstNameAndName: {
      deps: ['name', 'firstName'],
      fn: function () {
        return this.firstName + ' ' + this.name; 
      }
    }

  }
});