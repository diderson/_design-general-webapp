describe('testing the map view function server/views/docsByType/map.js', function() {
  var fakerequest = require('./lib/couch-fakerequest')
    , mapFn = fakerequest.createFunctionFromFile('./server/views/docsByType/map.js')
    , assert = require('assert');

  describe('general things', function () {
    it('should be a function', function () {
      assert.equal('function',typeof mapFn);
    });
  });

  describe('error cases', function () {
    xit('should not emit anything when the doc has no property "type"', function (done) {
    
    });
  });

})