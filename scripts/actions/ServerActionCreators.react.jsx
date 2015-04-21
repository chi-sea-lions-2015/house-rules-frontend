var HouseRulesAPIDispatcher = require('../dispatcher/HouseRulesAPIDispatcher.js');
var HouseRulesConstants = require('../constants/HouseRulesConstants.js');

var ActionTypes = HouseRulesConstants.ActionTypes;

module.exports = {

  receiveLogin: function(json, errors) {
    HouseRulesAPIDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveMessages: function(json) {
    HouseRulesAPIDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_MESSAGES,
      json: json
    });
  },

  receiveMessage: function(json) {
    HouseRulesAPIDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_MESSAGE,
      json: json
    });
  },

  receiveCreatedMessage: function(json, errors) {
    HouseRulesAPIDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_CREATED_MESSAGE,
      json: json,
      errors: errors
    });
  },

  receiveRules: function(json) {
    HouseRulesAPIDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RULES,
      json: json
    });
  },

  receiveRule: function(json) {
    HouseRulesAPIDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RULE,
      json: json
    });
  },

  receiveCreatedRule: function(json, errors) {
    HouseRulesAPIDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_CREATED_RULE,
      json: json,
      errors: errors
    });
  },

  receiveEvents: function(json) {
    HouseRulesAPIDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_EVENTS,
      json: json
    });
  },

  receiveEvent: function(json) {
    HouseRulesAPIDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_EVENT,
      json: json
    });
  },

  receiveCreatedEvent: function(json, errors) {
    HouseRulesAPIDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_CREATED_EVENT,
      json: json,
      errors: errors
    });
  },

  receiveItems: function(json) {
    HouseRulesAPIDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_ITEMS,
      json: json
    });
  },

  receiveItem: function(json) {
    HouseRulesAPIDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_ITEM,
      json: json
    });
  },

  receiveCreatedItem: function(json, errors) {
    HouseRulesAPIDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_CREATED_ITEM,
      json: json,
      errors: errors
    });
  }

};
