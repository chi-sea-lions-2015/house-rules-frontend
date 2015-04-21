var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var RuleStore = require('../../stores/RuleStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var RuleActionCreators = require('../../actions/RuleActionCreators.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var timeago = require('timeago');


var State = require('react-router').State;

var RulePage = React.createClass({

  mixins: [ State ],

  getInitialState: function() {
    return {
      story: RuleStore.getRule(),
      errors: []
    };
  },

  componentDidMount: function() {
    RuleStore.addChangeListener(this._onChange);
    RuleActionCreators.loadRule(this.getParams().rule_id);
  },

  componentWillUnmount: function() {
    RuleStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      rule: RuleStore.getRule(),
      errors: RuleStore.getErrors()
    });
  },

  render: function() {
    return (
      <div className="row">
        <p>{this.state.story.content}</p>
      </div>
     );
  }

});

module.exports = RulePage;