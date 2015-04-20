var keyMirror = require('keymirror');

var APIRoot = "http://localhost:3002";

module.exports = {

  APIEndpoints: {
    LOGIN:          APIRoot + "/login",
    REGISTRATION:   APIRoot + "/users",
    MESSAGES:       APIRoot + "/houses/1/messages",
    CHORES:         APIRoot + "/houses/1/chores"
  },

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keyMirror({
    // Session
    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,

    // Routes
    REDIRECT: null,

    LOAD_MESSAGES: null,
    RECEIVE_MESSAGES: null,
    LOAD_MESSAGE: null,
    RECEIVE_MESSAGE: null,
    CREATE_MESSAGE: null,
    RECEIVE_CREATED_MESSAGE: null,

    LOAD_CHORES: null,
    RECEIVE_CHORES: null,
    LOAD_CHORE: null,
    RECEIVE_CHORE: null,
    CREATE_CHORE: null,
    RECEIVE_CREATED_CHORE: null
  })

};
