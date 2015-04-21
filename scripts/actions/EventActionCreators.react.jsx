var HouseRulesAPIDispatcher = require('../dispatcher/HouseRulesAPIDispatcher.js');
var HouseRulesConstants = require('../constants/HouseRulesConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = HouseRulesConstants.ActionTypes;

module.exports = {

  loadEvents: function() {
    HouseRulesAPIDispatcher.handleViewAction({
      type: ActionTypes.LOAD_EVENTS
    });
    WebAPIUtils.loadEvents();
  },

  loadEvent: function(eventId) {
    HouseRulesAPIDispatcher.handleViewAction({
      type: ActionTypes.LOAD_EVENT,
      eventId: eventId
    });
    WebAPIUtils.loadEvent(eventId);
  },


  createEvent: function(name, date, description) {
    HouseRulesAPIDispatcher.handleViewAction({
      type: ActionTypes.CREATE_EVENT,
      name: name,
      date: date,
      description: description
    });
    WebAPIUtils.createEvent(name, date, description);
  }

};

