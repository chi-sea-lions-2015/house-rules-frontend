var HouseRulesAPIDispatcher = require('../dispatcher/HouseRulesAPIDispatcher.js');
var HouseRulesConstants = require('../constants/HouseRulesConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = HouseRulesConstants.ActionTypes;

module.exports = {

  loadStories: function() {
    HouseRulesAPIDispatcher.handleViewAction({
      type: ActionTypes.LOAD_STORIES
    });
    WebAPIUtils.loadStories();
  },
  
  loadStory: function(storyId) {
    HouseRulesAPIDispatcher.handleViewAction({
      type: ActionTypes.LOAD_STORY,
      storyId: storyId
    });
    WebAPIUtils.loadStory(storyId);
  },

  createStory: function(title, body) {
    HouseRulesAPIDispatcher.handleViewAction({
      type: ActionTypes.CREATE_STORY,
      title: title,
      body: body
    });
    WebAPIUtils.createStory(title, body);
  }

};

