var HouseRulesAPIDispatcher = require('../dispatcher/HouseRulesAPIDispatcher.js');
var HouseRulesConstants = require('../constants/HouseRulesConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = HouseRulesConstants.ActionTypes;

module.exports = {

  loadItems: function() {
    HouseRulesAPIDispatcher.handleViewAction({
      type: ActionTypes.LOAD_ITEMS
    });
    WebAPIUtils.loadItems();
  },

  loadItem: function(itemId) {
    HouseRulesAPIDispatcher.handleViewAction({
      type: ActionTypes.LOAD_ITEM,
      itemId: itemId
    });
    WebAPIUtils.loadItem(itemId);
  },


  createItem: function(name, brand, quantity, stock_level) {
    HouseRulesAPIDispatcher.handleViewAction({
      type: ActionTypes.CREATE_ITEM,
      name: name,
      brand: brand,
      quantity: quantity,
      stock_level: stock_level
    });
    WebAPIUtils.createItem(name, brand, quantity, stock_level);
  }

};

