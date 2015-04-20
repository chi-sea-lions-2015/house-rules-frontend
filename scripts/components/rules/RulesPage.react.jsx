var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var RuleStore = require('../../stores/RuleStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var RuleActionCreators = require('../../actions/RuleActionCreators.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var timeago = require('timeago');

var RulesPage = React.createClass({

  getInitialState: function() {
    return {
      rules: RuleStore.getAllRules(),
      errors: []
    };
  },

  componentDidMount: function() {
    RuleStore.addChangeListener(this._onChange);
    RuleActionCreators.loadRules();
  },

  componentWillUnmount: function() {
    RuleStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      rules: RuleStore.getAllRules(),
      errors: RuleStore.getErrors()
    });
  },

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (
      <div>
        {errors}
        <div className="row">
          <RulesList rules={this.state.rules} />
        </div>
        <form ref="form" className="rule-form" method="post" onSubmit={ this.handleSubmit }>
        <p><textarea ref="content" name="rule[content]" placeholder="Say something..." /></p>
        <p><button type="submit">Post rule</button></p>
      </form>
      </div>
    );
  }
});

var RuleItem = React.createClass({
  render: function() {
    return (
      <li className="rule">
        <div className="rule__body">{this.props.rule.content}</div>
      </li>
      );
  }
});

var RulesList = React.createClass({
  render: function() {
    return (
      <ul className="large-8 medium-10 small-12 small-centered columns">
        {this.props.rules.map(function(rule, index){
          return <RuleItem rule={rule} key={"rule-" + index}/>
        })}
      </ul>
    );
  }
});

module.exports = RulesPage;

