var assert = require('chai').assert;
var helpchat = require('../libs/helpchat/helpchat.js');

describe('helpchat', function() {
  describe('Tech Assitant functions', function() {
    it('Should return all of the tech support assistants', function() {
      var assistants = helpchat.getLoggedInAssistants();
      assertArrayProperty(assistants, 'name', ['James', 'Mary', 'Gary']);
    });

    it('Should add a tech support assistant to the assistants', function() {
      var assistants = helpchat.getLoggedInAssistants();
      var expected = [
        {
          name: 'James',
          available: true
        },
        { name: 'Mary',
          available: true
        },
        {
          name: 'Gary',
          available: true
        },
        {
          name: 'Mark',
          available: true
        }
      ];
      assert.lengthOf(assistants, 3);
      helpchat.addAssistant({name: 'Mark', available: true});
      assert.lengthOf(assistants, 4);
      assertArrayProperty(assistants, 'name', ['James', 'Mary', 'Gary', 'Mark']);
    });
  });

  describe('Customer functions', function() {
    it('Customer queue should initially be empty', function() {
      assert.lengthOf(helpchat.getCustomerQueue(), 0);
    });
    it('Should add a customer to the queue', function(){
      assert.lengthOf(helpchat.getCustomerQueue(), 0);
      helpchat.addCustomerToQueue({name: 'Mark', peerjsId: '1'});
      assert.lengthOf(helpchat.getCustomerQueue(), 1);
    })
  });
});

function assertArrayProperty(array, property, propValues) {
  for(var i = 0; i < array.length; i++) {
    assert.equal(array[i][property], propValues[i]);
  }
}
