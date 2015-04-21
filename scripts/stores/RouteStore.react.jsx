var HouseRulesAPIDispatcher = require('../dispatcher/HouseRulesAPIDispatcher.js');
var HouseRulesConstants = require('../constants/HouseRulesConstants.js');
var SessionStore = require('../stores/SessionStore.react.jsx');
var MessageStore = require('../stores/MessageStore.react.jsx');
var RuleStore = require('../stores/RuleStore.react.jsx');
var EventStore = require('../stores/EventStore.react.jsx');
var ItemStore = require('../stores/ItemStore.react.jsx');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var Router = require('react-router');
var routes = require('../routes.jsx');

var router = Router.create({
  routes: routes,
  location: null // Router.HistoryLocation
});

var ActionTypes = HouseRulesConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var RouteStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function() {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getRouter: function() {
    return router;
  },

  redirectHome: function() {
    router.transitionTo('app');
  }
});

RouteStore.dispatchToken = HouseRulesAPIDispatcher.register(function(payload) {
  HouseRulesAPIDispatcher.waitFor([
    SessionStore.dispatchToken,
    MessageStore.dispatchToken,
    RuleStore.dispatchToken,
    EventStore.dispatchToken,
    ItemStore.dispatchToken
  ]);

  var action = payload.action;

  switch(action.type) {

    case ActionTypes.REDIRECT:
      router.transitionTo(action.route);
      break;

    case ActionTypes.LOGIN_RESPONSE:
      if (SessionStore.isLoggedIn()) {
        router.transitionTo('messages');
        // Dirty hack, need to figure this out
      }
      break;

    case ActionTypes.CREATE_MESSAGE:
      break;
      //THIS IS HOW YOU MAINTAIN THE HOUSE_ID
    case ActionTypes.RECEIVE_CREATED_MESSAGE:
      router.transitionTo('messages', action.json );
      break;

    case ActionTypes.RECEIVE_CREATED_RULE:
    debugger;
      router.transitionTo('rules', action.json.rule);
      break;

    case ActionTypes.RECEIVE_CREATED_COMMUNAL_ITEM:
      router.transitionTo('items');
      break;

    case ActionTypes.RECEIVE_CREATED_EVENT:
      router.transitionTo('events');
      break;

    case ActionTypes.RECEIVE_CREATED_CHORE:
      router.transitionTo('chores');
      break;

    default:
  }

  return true;
});

module.exports = RouteStore;
