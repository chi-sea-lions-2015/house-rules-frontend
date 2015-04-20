var HouseRulesAPIDispatcher = require('../dispatcher/HouseRulesAPIDispatcher.js');
var HouseRulesConstants = require('../constants/HouseRulesConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = HouseRulesConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _chores = [];
var _errors = [];
var _chore = { task: "" };

var ChoreStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllChores: function() {
    return _chores;
  },

  getChore: function() {
    return _chore;
  },

  getErrors: function() {
    return _errors;
  }

});

ChoreStore.dispatchToken = HouseRulesAPIDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_CHORES:
      _chores = action.json.chores;
      ChoreStore.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_CHORE:
      if (action.json) {
        _mchores.unshift(action.json.chore);
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      ChoreStore.emitChange();
      break;

    case ActionTypes.RECEIVE_CHORE:
      if (action.json) {
        _chore = action.json.chore;
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      ChoreStore.emitChange();
      break;
  }

  return true;
});

module.exports = ChoreStore;
