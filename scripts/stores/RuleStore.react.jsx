var HouseRulesAPIDispatcher = require('../dispatcher/HouseRulesAPIDispatcher.js');
var HouseRulesConstants = require('../constants/HouseRulesConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = HouseRulesConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _rules = [];
var _errors = [];
var _rule = { content: ""};

var RuleStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllRules: function() {
    return _rules;
  },

  getRule: function() {
    return _rule;
  },

  getErrors: function() {
    return _errors;
  }

});

RuleStore.dispatchToken = HouseRulesAPIDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_RULES:
      _rules = action.json.rules;
      RuleStore.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_RULE:
      if (action.json) {
      debugger;
        _rules.unshift(action.json.rule);
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      RuleStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RULE:
      if (action.json) {
        _rule = action.json.rule;
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      RuleStore.emitChange();
      break;
  }

  return true;
});

module.exports = RuleStore;
