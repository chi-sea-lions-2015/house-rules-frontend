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
  }

};
