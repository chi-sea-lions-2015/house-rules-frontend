var HouseRulesAPIDispatcher = require('../dispatcher/HouseRulesAPIDispatcher.js');
var SmallConstants = require('../constants/SmallConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = SmallConstants.ActionTypes;

module.exports = {

  loadMessages: function() {
    HouseRulesAPIDispatcher.handleViewAction({
      type: ActionTypes.LOAD_MESSAGES
    });
    WebAPIUtils.loadMessages();
  },

  loadMessage: function(messageId) {
    HouseRulesAPIDispatcher.handleViewAction({
      type: ActionTypes.LOAD_MESSAGE,
      messageId: messageId
    });
    WebAPIUtils.loadMessage(messageId);
  },

  createMessage: function(content) {
    HouseRulesAPIDispatcher.handleViewAction({
      type: ActionTypes.CREATE_MESSAGE,
      content: content
    });
    WebAPIUtils.createMessage(content);
  }

};

