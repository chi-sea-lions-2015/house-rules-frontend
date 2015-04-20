var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var RuleStore = require('../../stores/RuleStore.react.jsx');
var RuleActionCreators = require('../../actions/RuleActionCreators.react.jsx');
var State = require('react-router').State;

var RulePage = React.createClass({

  mixins: [ State ],

  getInitialState: function() {
    return {
      rule: RuleStore.getRule(),
      errors: []
    };
  },

  componentDidMount: function() {
    RuleStore.addChangeListener(this._onChange);
    RuleActionCreators.loadRule(this.getParams().ruleId);
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
        <div className="rule__body">{this.state.rule.content}</div>
      </div>
     );
  }

});

module.exports = RulePage;
