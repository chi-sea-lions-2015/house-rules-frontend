var HouseRulesAPIDispatcher = require('../dispatcher/HouseRulesAPIDispatcher.js');
var HouseRulesConstants = require('../constants/HouseRulesConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = HouseRulesConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _errors = [];
var _user = { first_name: "", last_name: "", email: "", username: "" };

var UserStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getUser: function() {
    return _user;
  },

  getErrors: function() {
    return _errors;
  }

});

UserStore.dispatchToken = HouseRulesAPIDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.type) {

    case ActionTypes.RECEIVE_USER:
      if (action.json) {
        _user = action.json.user;
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      UserStore.emitChange();
      break;
  }

  return true;
});

module.exports = UserStore;
