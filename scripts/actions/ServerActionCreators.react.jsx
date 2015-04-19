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

  receiveStories: function(json) {
    HouseRulesAPIDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_STORIES,
      json: json
    });
  },

  receiveStory: function(json) {
    HouseRulesAPIDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_STORY,
      json: json
    });
  },
  
  receiveCreatedStory: function(json, errors) {
    HouseRulesAPIDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_CREATED_STORY,
      json: json,
      errors: errors
    });
  }
  
};

