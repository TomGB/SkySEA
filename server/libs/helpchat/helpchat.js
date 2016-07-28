var HelpChat = function() {
  this._loggedInAssistants =  [
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
    }
  ];
  this._customerQueue = [];
};

HelpChat.prototype.getNextCustomer = function() {
  return this._customerQueue.pop();
}

HelpChat.prototype.addCustomerToQueue = function(customer) {
  this._customerQueue.push(customer)
}

HelpChat.prototype.addAssistant = function(assistant) {
  this._loggedInAssistants.push(assistant);
}

HelpChat.prototype.getCustomerQueue = function() {
  return this._customerQueue;
}

HelpChat.prototype.getLoggedInAssistants = function() {
  return this._loggedInAssistants;
}

module.exports = new HelpChat();
