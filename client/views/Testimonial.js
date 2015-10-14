var AmpersandView = require('ampersand-view');
var app = require('ampersand-app');
var TestimonialModel = require('../models/Testimonial');

module.exports = AmpersandView.extend({
  initialize: function () {
    this.model = new TestimonialModel();
  },
  events: {
    "click #submit-testimonial": "handleFormSubmit",
    'change #testimonial-text': 'handleTextChange'
  },
  bindings: {
    'model.text': {
      type: 'value',
      selector: '#testimonial-text'
    }
  },
  handleFormSubmit: function (e) {
    e.preventDefault();
    this.model.save({
      success: function () {
          console.log('saved!');
      },
      error: function () {
          console('failed to save');
      }
    });
  },
  handleTextChange: function (e) {
    e.preventDefault();
    var source = e.target || e.srcElement;
    var value = source.value;
    this.model.text = value;
  }
});