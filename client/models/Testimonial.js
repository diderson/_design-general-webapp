var AmpersandModel = require('ampersand-model');
var app = require('ampersand-app');

module.exports = AmpersandModel.extend({
  urlRoot: app.config.rooturl,
  ajaxConfig: function () {
    return {
      headers: {
        'If-Match': this._rev
      }
    };
  },
  idAttribute: '_id',
  props: {
    _id: {
      type: 'string',
      required: false
    },
    _rev: {
      type: 'string',
      required: false
    },
    text: {
      type: 'string',
      required: true
    }
  }
});