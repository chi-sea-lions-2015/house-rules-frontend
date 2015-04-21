var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var RuleStore = require('../../stores/RuleStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var RuleActionCreators = require('../../actions/RuleActionCreators.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var timeago = require('timeago');

var RuleBox = React.createClass({

  getInitialState: function() {
    return {
      rule: RuleStore.getAllRules(),
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

  render: function () {
    return (
      <div className="rule-box">
      <div className="row">
      <div className="large-3 columns"><br /></div>
      <div className="large-6 columns">
        <h4>Be a Dictator!</h4>
        <RuleEditForm form={ this.state.form } />
        </div>
        <div className="large-3 columns"><br /></div>
        </div></div>
    );
  }
});

var RuleEditForm = React.createClass({
  handleSubmit: function ( event ) {
    event.preventDefault();
    var content = this.refs.content.getDOMNode().value;
    RuleActionCreators.editRule(content);

    // validate
    if (!content) {
      return false;
    }

    // reset form
    this.refs.content.getDOMNode().value = "";
  },
  render: function () {
    return (
      <form ref="form" className="rule-form" method="post" onSubmit={ this.handleSubmit }>
      <input type="hidden" name="_method" value="PUT"/>
        <fieldset>
          <legend>Create a Rule</legend>
          <p><textarea ref="content" name="rule[content]"/></p>
          <p><button type="submit">Post rule</button></p>
        </fieldset>
      </form>
    )
  }
});