var ServerActionCreators = require('../actions/ServerActionCreators.react.jsx');
var HouseRulesConstants = require('../constants/HouseRulesConstants.js');
var request = require('superagent');

function _getErrors(res) {
  var errorMsgs = ["Something went wrong, please try again"];
  if ((json = JSON.parse(res.text))) {
    if (json['errors']) {
      errorMsgs = json['errors'];
    } else if (json['error']) {
      errorMsgs = [json['error']];
    }
  }
  return errorMsgs;
}

var APIEndpoints = HouseRulesConstants.APIEndpoints;

module.exports = {

  signup: function(username, firstName, lastName, phone, email, password, passwordConfirmation) {
    request.post(APIEndpoints.REGISTRATION)
      .send({ user: {
        email: email,
        username: username,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
      }})
      .set('Accept', 'application/json')
      .end(function(error, res) {
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  },

  login: function(email, password) {
    request.post(APIEndpoints.LOGIN)
      .send({ email: email, password: password, grant_type: 'password' })
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  },

  loadMessages: function() {
    request.get(APIEndpoints.MESSAGES)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveMessages(json);
        }
      });
  },

  loadMessage: function(messageId) {
    request.get(APIEndpoints.MESSAGES + '/' + messageId)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveMessage(json);
        }
      });
  },

  createMessage: function(content) {
    request.post(APIEndpoints.MESSAGES)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .send({ message: { content: content } })
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveCreatedMessage(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveCreatedMessage(json, null);
          }
        }
      });
  },

  loadRules: function() {
    request.get(APIEndpoints.RULES)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveRules(json);
        }
      });
  },

  loadRule: function(ruleId) {
    request.get(APIEndpoints.RULES + '/' + ruleId)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveRule(json);
        }
      });
  },

  createRule: function(content) {
    request.post(APIEndpoints.RULES)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .send({ rule: { content: content } })
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveCreatedRule(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveCreatedRule(json, null);
          }
        }
      });
  },

  loadEvents: function() {
    request.get(APIEndpoints.EVENTS)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveEvents(json);
        }
      });
  },

  loadEvent: function(eventId) {
    request.get(APIEndpoints.EVENTS + '/' + eventId)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveEvent(json);
        }
      });
  },

  createEvent: function(name, date, description) {
    request.post(APIEndpoints.EVENTS)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .send({ evnet: { name: name, date: date, description: description } })
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveCreatedEvent(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveCreatedEvent(json, null);
          }
        }
      });
  },

  loadItems: function() {
    request.get(APIEndpoints.ITEMS)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveItems(json);
        }
      });
  },

  loadItem: function(itemId) {
    debugger;
    request.get(APIEndpoints.ITEMS + '/' + itemId)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveItem(json);
        }
      });
  },

  createItem: function(name, brand, quantity, stock_level) {
    request.post(APIEndpoints.ITEMS)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .send({ communal_item: { name: name, brand: brand, quantity: quantity, stock_level: stock_level } })
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveCreatedItem(null, errorMsgs);
          } else {
            json = JSON.parse(res.name);
            ServerActionCreators.receiveCreatedItem(json, null);
          }
        }
      });
  },

  loadChores: function() {
    request.get(APIEndpoints.CHORES)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveChores(json);
        }
      });
  },

  loadChore: function(choreId) {
    request.get(APIEndpoints.CHORES + '/' + choreId)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveChore(json);
        }
      });
  },

  createChore: function(task) {
    request.post(APIEndpoints.CHORES)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .send({ chore: { task: task } })
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveCreatedChore(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveCreatedChore(json, null);
          }
        }
      });
  },

  loadUser: function(userId) {
    request.get(APIEndpoints.USERS + '/' + userId)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveUser(json);
        }
      });
  },

};
