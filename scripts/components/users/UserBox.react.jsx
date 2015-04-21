var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var RuleStore = require('../../stores/RuleStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var RuleActionCreators = require('../../actions/RuleActionCreators.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var timeago = require('timeago');

var UserBox = React.createClass({

  getInitialState: function() {
    return {
      rules: UserStore.getUser(),
      errors: []
    };
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
    UserActionCreators.loadUser();
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      user: UserStore.getUser(),
      errors: UserStore.getErrors()
    });
  },

  render: function () {
    return (
      <div className="user-box">
        <img src={ this.props.imgSrc } alt={ this.props.imgAlt } />
        <User user={ this.state.user } />
        <hr />
      </div>
    );
  }
});

var User = React.createClass({
  render: function () {
    return (
      <li className="story">
        <div className="story__body">{this.props.user.first_name} {this.props.user.last_name}</div>
      </li>
    )
  }
});


module.exports = UserBox;
