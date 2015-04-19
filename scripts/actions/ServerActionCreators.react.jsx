var HouseRulesAPIDispatcher = require('../dispatcher/HouseRulesDispatcher.js');
var SmallConstants = require('../constants/SmallConstants.js');

var ActionTypes = SmallConstants.ActionTypes;

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
