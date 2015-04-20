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
      .send({ username: email, password: password, grant_type: 'password' })
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

<<<<<<< HEAD
loadMessages: function() {
=======
  loadMessages: function() {
>>>>>>> 1b10e59f711606aa473cbc197bd9aa96b4e58798
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

<<<<<<< HEAD

  createMessage: function(title, body) {
    request.post(APIEndpoints.STORIES)
=======
  createMessage: function(content) {
    request.post(APIEndpoints.MESSAGES)
>>>>>>> 1b10e59f711606aa473cbc197bd9aa96b4e58798
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
<<<<<<< HEAD
=======
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
>>>>>>> 1b10e59f711606aa473cbc197bd9aa96b4e58798
          }
        }
      });
  }

};

