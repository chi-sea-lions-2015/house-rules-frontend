var HouseRulesAPIDispatcher = require('../dispatcher/HouseRulesAPIDispatcher.js');
var HouseRulesConstants = require('../constants/HouseRulesConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = HouseRulesConstants.ActionTypes;

module.exports = {

  loadChores: function() {
    HouseRulesAPIDispatcher.handleViewAction({
      type: ActionTypes.LOAD_CHORES
    });
    WebAPIUtils.loadChores();
  },

  loadChore: function(choreId) {
    HouseRulesAPIDispatcher.handleViewAction({
      type: ActionTypes.LOAD_CHORE,
      choreId: choreId
    });
    WebAPIUtils.loadChore(choreId);
  },

  createChore: function(task) {
    HouseRulesAPIDispatcher.handleViewAction({
      type: ActionTypes.CREATE_CHORE,
      task: task
    });
    WebAPIUtils.createChore(task);
  }

};
