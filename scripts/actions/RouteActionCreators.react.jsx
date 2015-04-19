var HouseRulesAPIDispatcher = require('../dispatcher/HouseRulesAPIDispatcher.js');
var HouseRulesConstants = require('../constants/HouseRulesConstants.js');

var ActionTypes = HouseRulesConstants.ActionTypes;

module.exports = {

  redirect: function(route) {
    HouseRulesAPIDispatcher.handleViewAction({
      type: ActionTypes.REDIRECT,
      route: route
    });
  }

};


