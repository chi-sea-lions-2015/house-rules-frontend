var keyMirror = require('keymirror');

var APIRoot = "http://localhost:3002";

module.exports = {

  APIEndpoints: {
    LOGIN:          APIRoot + "/login",
    REGISTRATION:   APIRoot + "/users",
    MESSAGES:       APIRoot + "/houses/1/messages",
    RULES:          APIRoot + "/houses/1/rules",
    RULE:           APIRoot + "/houses/1/rules/1",
    CHORES:         APIRoot + "/houses/1/chores",
    EVENTS:          APIRoot + "/houses/1/events",
    ITEMS:          APIRoot + "/houses/1/communal_items"


  },

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keyMirror({

    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,

    REDIRECT: null,

    LOAD_MESSAGES: null,
    RECEIVE_MESSAGES: null,
    LOAD_MESSAGE: null,
    RECEIVE_MESSAGE: null,
    CREATE_MESSAGE: null,
    RECEIVE_CREATED_MESSAGE: null,

    LOAD_RULES: null,
    RECEIVE_RULES: null,
    LOAD_RULE: null,
    RECEIVE_RULE: null,
    CREATE_RULE: null,
    RECEIVE_CREATED_RULE: null,

    LOAD_CHORES: null,
    RECEIVE_CHORES: null,
    LOAD_CHORE: null,
    RECEIVE_CHORE: null,
    CREATE_CHORE: null,
    RECEIVE_CREATED_CHORE: null,

    LOAD_EVENTS: null,
    RECEIVE_EVENTS: null,
    LOAD_EVENT: null,
    RECEIVE_EVENT: null,
    CREATE_EVENT: null,
    RECEIVE_CREATED_EVENT: null,

    LOAD_ITEMS: null,
    RECEIVE_ITEMS: null,
    LOAD_ITEM: null,
    RECEIVE_ITEM: null,
    CREATE_ITEM: null,
    RECEIVE_CREATED_ITEM: null,

    LOAD_USER: null,
    RECEIVE_USER: null,
  })

};
