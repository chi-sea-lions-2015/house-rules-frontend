var HouseRulesAPIDispatcher = require('../dispatcher/HouseRulesAPIDispatcher.js');
var HouseRulesConstants = require('../constants/HouseRulesConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = HouseRulesConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _messages = [];
var _errors = [];
var _message = { content: "", author: { first_name: "" } };

var MessageStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllMessages: function() {
    return _messages;
  },

  getMessage: function() {
    return _message;
  },

  getErrors: function() {
    return _errors;
  }

});

MessageStore.dispatchToken = HouseRulesAPIDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_MESSAGES:
      _messages = action.json.messages;
      MessageStore.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_MESSAGE:
      if (action.json) {
        _messages.unshift(action.json.message);
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      MessageStore.emitChange();
      break;

    case ActionTypes.RECEIVE_MESSAGE:
      if (action.json) {
        _message = action.json.message;
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      MessageStore.emitChange();
      break;
  }

  return true;
});

module.exports = MessageStore;
