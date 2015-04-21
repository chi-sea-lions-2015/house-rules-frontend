var HouseRulesAPIDispatcher = require('../dispatcher/HouseRulesAPIDispatcher.js');
var HouseRulesConstants = require('../constants/HouseRulesConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = HouseRulesConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _events = [];
var _errors = [];
var _event = { content: ""};

var EventStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllEvents: function() {
        console.log("_events");
    console.log(_events);
    return _events;
  },

  getEvent: function() {
    return _event;
  },

  getErrors: function() {
    return _errors;
  }

});

EventStore.dispatchToken = HouseRulesAPIDispatcher.register(function(payload) {
  var action = payload.action;


  switch(action.type) {

    case ActionTypes.RECEIVE_EVENTS:
      _events = action.json.events;
      EventStore.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_EVENT:
      if (action.json) {
        _events.push(action.json.event);
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      EventStore.emitChange();
      break;

    case ActionTypes.RECEIVE_EVENT:
      if (action.json) {
        _event = action.json.event;
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      EventStore.emitChange();
      break;
  }

  return true;
});

module.exports = EventStore;
