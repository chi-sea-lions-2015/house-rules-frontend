var HouseRulesConstants = require('../constants/HouseRulesConstants.js');
var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var PayloadSources = HouseRulesConstants.PayloadSources;

var HouseRulesAPIDispatcher = assign(new Dispatcher(), {

  handleServerAction: function(action) {
    debugger;
    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  },

  handleViewAction: function(action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = HouseRulesAPIDispatcher;
