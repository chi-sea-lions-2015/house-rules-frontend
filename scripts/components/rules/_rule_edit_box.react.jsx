var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var RuleStore = require('../../stores/RuleStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var RuleActionCreators = require('../../actions/RuleActionCreators.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var timeago = require('timeago');

var RuleEditBox = React.createClass({

  getInitialState: function() {
    console.log("initial state");
    return {
      rule: RuleStore.getRule(),
      errors: []
    };
  },

  componentDidMount: function() {
    console.log("Action");
    console.log(this.state.rule);
    console.log(this.props);
    RuleStore.addChangeListener(this._onChange);
    RuleActionCreators.loadRule();
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

  render: function () {
    return (
      <div className="rule-box">
      <div className="row">
      <div className="large-3 columns"><br /></div>
      <div className="large-6 columns">
        <h3>House Rule:</h3>
        <img src={ this.props.imgSrc } alt={ this.props.imgAlt } />
        <Rule rule={ this.state.rule } />
        <hr />
        <h4>Edit</h4>

        </div>
        <div className="large-3 columns"><br /></div>
        </div></div>
    );
  }
});

var Rule = React.createClass({
  render: function () {
    return (
      <li>
        {this.props.rule.content}
      </li>
    )
  }
});


// var RuleForm = React.createClass({
//   handleSubmit: function ( event ) {
//     event.preventDefault();
//     var content = this.refs.content.getDOMNode().value;
//     RuleActionCreators.createRule(content);

//     // validate
//     if (!content) {
//       return false;
//     }

//     // reset form
//     this.refs.content.getDOMNode().value = "";
//   },
//   render: function () {
//     return (
//       <form ref="form" className="rule-form" method="post" onSubmit={ this.handleSubmit }>
//         <fieldset>
//           <legend>Create a Rule</legend>
//           <p><textarea ref="content" name="rule[content]" placeholder="Create a rule..." /></p>
//           <p><button type="submit">Post rule</button></p>
//         </fieldset>
//       </form>
//     )
//   }
// });


module.exports = RuleEditBox;
