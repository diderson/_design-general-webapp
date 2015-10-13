var AmpersandView = require('ampersand-view');
var app = require('ampersand-app');
var self;

module.exports = AmpersandView.extend({
  template: function () {
    return document.getElementById('generalTemplate').innerHTML;
  },
  events: {
    "click #click-button": "clickButtonFunction"
  }
  bindings: {
    'model.text': {
      type: 'text',
      selector: '#general-body'
    }
  },
  render: function (opts) {
    this.model = opts.model;
    this.renderWithTemplate(this);
    return this;
  },
  clickButtonFunction: function (e) {
    e.preventDefault();
    alert('Hello World click');
  }
});