var HouseRulesAPIDispatcher = require('../dispatcher/HouseRulesAPIDispatcher.js');
var HouseRulesConstants = require('../constants/HouseRulesConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = HouseRulesConstants.ActionTypes;

module.exports = {

  loadUser: function(userId) {
    HouseRulesAPIDispatcher.handleViewAction({
      type: ActionTypes.LOAD_USER,
      userId: userId
    });
    WebAPIUtils.loadMessage(messageId);
  }

};
