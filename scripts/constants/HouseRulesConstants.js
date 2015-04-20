var keyMirror = require('keymirror');

var APIRoot = "http://localhost:3002";

module.exports = {

  APIEndpoints: {
    LOGIN:          APIRoot + "/v1/login",
    REGISTRATION:   APIRoot + "/v1/users",
    MESSAGES:       APIRoot + "/houses/1/messages",
    RULES:          APIRoot + "/houses/1/rules",
    CHORES:         APIRoot + "/houses/1/chores"
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
    RECEIVE_CREATED_CHORE: null
  })

};
