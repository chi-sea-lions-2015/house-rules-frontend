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

  render: function () {
    return (
      <div className="rule-box">
        <img src={ this.props.imgSrc } alt={ this.props.imgAlt } />
        <RuleList rules={ this.state.rules } />
        <hr />
        <h4>Create a Rule</h4>
        <RuleForm form={ this.state.form } />
        <div className="messages_link">
          <Link to="messages" params={ {houseId: 1}}>
          <p>Messages</p>
          </Link>
        </div>
      </div>
    );
  }
});

var Rule = React.createClass({
  render: function () {
    return (
      <li className="story">
        <div className="story__body">{this.props.rule.content}</div>
      </li>
    )
  }
});

var RuleList = React.createClass({
  render: function () {
    var ruleNodes = this.props.rules.map(function ( rule ) {
      return <Rule rule={ rule } key={ rule.id } />
    });

    return (
      <div className="rule-list">
        { ruleNodes }
      </div>
    )
  }
});

var RuleForm = React.createClass({
  handleSubmit: function ( event ) {
    event.preventDefault();
    var content = this.refs.content.getDOMNode().value;
    RuleActionCreators.createRule(content);

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
        <p><textarea ref="content" name="rule[content]" placeholder="Create a rule..." /></p>
        <p><button type="submit">Post rule</button></p>
      </form>
    )
  }
});


module.exports = RuleBox;
