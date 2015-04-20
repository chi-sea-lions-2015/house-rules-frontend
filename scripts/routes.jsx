var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var HouseRules = require('./components/HouseRules.react.jsx');
var LoginPage = require('./components/session/LoginPage.react.jsx');
var MessageBox = require('./components/messages/_message_box.react.jsx');
var RuleBox = require('./components/rules/_rule_box.react.jsx');
var SignupPage = require('./components/session/SignupPage.react.jsx');
var ChoreBox = require('./components/chores/ChoreBox.react.jsx');

module.exports = (
  <Route name="app" path="/" handler={HouseRules}>
    <DefaultRoute handler={RuleBox} />
    <Route name="login" path="/login" handler={LoginPage}/>
    <Route name="signup" path="/signup" handler={SignupPage}/>
    <Route name="rules" path="/houses/:houseId/rules" handler={RuleBox}/>
    <Route name="messages" path="/houses/:houseId/messages" handler={MessageBox}/>
    <Route name="chores" path="/houses/:houseId/chores" handler={ChoreBox}/>
  </Route>
);
