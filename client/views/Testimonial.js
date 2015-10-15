var AmpersandView = require('ampersand-view');
var app = require('ampersand-app');
var TestimonialModel = require('../models/Testimonial');

module.exports = AmpersandView.extend({
  initialize: function () {
    this.model = new TestimonialModel();
  },
  events: {
    "click #submit-testimonial": "handleFormSubmit",
    'change #testimonial-text': 'handleTextChange',
    'click #destroy-testimonial': 'handleFormDestroy'
  },
  bindings: {
    'model.text': {
      type: 'value',
      selector: '#testimonial-text'
    }
  },
  handleFormDestroy: function (e) {
    e.preventDefault();
    this.model.destroy(this.model, {
      success: function () {
        console.log('destroyed!');
      },
      error: function () {
        console.log('failed to destroyed');
      }
    });
  },
  handleFormSubmit: function (e) {
    e.preventDefault();
    var self = this;
    this.model.save(this.model, {
      success: function (model, response) {
        model._id = response.id;
        model._rev = response.rev;
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