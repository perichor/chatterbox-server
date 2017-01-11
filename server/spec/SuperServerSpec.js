var handler = require('../request-handler');
var expect = require('chai').expect;
var stubs = require('./Stubs');

var waitForThen = function (test, cb) {
  setTimeout(function() {
    test() ? cb.apply(this) : waitForThen(test, cb);
  }, 5);
};

describe('More Server Tests', function() {
  it('should return objectId from POST request', function() {
    var stubMsg = {
      username: 'Jono',
      message: 'Do my bidding!'
    };

    var req = new stubs.request('/classes/messages', 'POST', stubMsg);
    var res = new stubs.response();

    handler.requestHandler(req, res);

    var message = JSON.parse(res._data);
    expect(message.objectId).to.be.above(31111);
    expect(res._ended).to.equal(true);
  });
  
  it('should return createdAt from POST request', function() {
    var stubMsg = {
      username: 'Jono',
      message: 'Do my bidding!'
    };

    var req = new stubs.request('/classes/messages', 'POST', stubMsg);
    var res = new stubs.response();

    handler.requestHandler(req, res);

    var message = JSON.parse(res._data);
    expect(!!message.createdAt).to.equal(true);
    expect(res._ended).to.equal(true);
  });
});
