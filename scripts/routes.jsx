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
var ItemBox = require('./components/items/_items_box.react.jsx');
var EventBox = require('./components/events/_event_box.react.jsx');
var UserBox = require('./components/users/UserBox.react.jsx');

>>>>>>> 45e308d12b45095d044c8b86df0e1c6057cd6cfd

module.exports = (
  <Route name="app" path="/" handler={HouseRules}>
    <DefaultRoute handler={LoginPage} />
    <Route name="login" path="/login" handler={LoginPage}/>
    <Route name="signup" path="/signup" handler={SignupPage}/>
    <Route name="rules" path="/houses/:house_id/rules" handler={RuleBox}/>
    <Route name="messages" path="/houses/:house_id/messages" handler={MessageBox}/>
<<<<<<< HEAD
    <Route name="chores" path="/houses/:houseId/chores" handler={ChoreBox}/>
    <Route name="items" path="/houses/:houseId/items" handler={ItemBox}/>
=======
    <Route name="chores" path="/houses/:house_id/chores" handler={ChoreBox}/>
    <Route name="items" path="/houses/:house_id/items" handler={ItemBox}/>
    <Route name="events" path="/houses/:house_id/events" handler={EventBox}/>
>>>>>>> 45e308d12b45095d044c8b86df0e1c6057cd6cfd
    <Route name="user" path="/users/:user_id" handler={UserBox}/>
  </Route>
);
