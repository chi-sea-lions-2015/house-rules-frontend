var HouseRulesAPIDispatcher = require('../dispatcher/HouseRulesAPIDispatcher.js');
var HouseRulesConstants = require('../constants/HouseRulesConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = HouseRulesConstants.ActionTypes;

module.exports = {

  loadRules: function() {
    HouseRulesAPIDispatcher.handleViewAction({
      type: ActionTypes.LOAD_RULES
    });
    WebAPIUtils.loadRules();
  },

  loadRule: function(ruleId) {
    HouseRulesAPIDispatcher.handleViewAction({
      type: ActionTypes.LOAD_MESSAGE,
      ruleId: ruleId
    });
    WebAPIUtils.loadRule(ruleId);
  },

  createRule: function(content) {
    HouseRulesAPIDispatcher.handleViewAction({
      type: ActionTypes.CREATE_RULE,
      content: content
    });
    WebAPIUtils.createRule(content);
  }

};

