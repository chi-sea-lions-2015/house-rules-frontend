var HouseRulesAPIDispatcher = require('../dispatcher/HouseRulesAPIDispatcher.js');
var HouseRulesConstants = require('../constants/HouseRulesConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = HouseRulesConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _items = [];
var _errors = [];
var _item = { content: "", author: { first_name: "" } };

var ItemStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllItems: function() {
    return _items;
  },

  getItem: function() {
    return _item;
  },

  getErrors: function() {
    return _errors;
  }

});

ItemStore.dispatchToken = HouseRulesAPIDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_ITEMS:
      _items = action.json.communal_items;
      ItemStore.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_ITEM:
      if (action.json) {
        debugger;
        _items.unshift(action.json.item);
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      ItemStore.emitChange();
      break;

    case ActionTypes.RECEIVE_ITEM:
      if (action.json) {
        _item = action.json.item;
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      ItemStore.emitChange();
      break;
  }

  return true;
});

module.exports = ItemStore;