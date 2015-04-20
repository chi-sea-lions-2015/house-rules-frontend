var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var MessageStore = require('../../stores/MessageStore.react.jsx');
var MessageActionCreators = require('../../actions/MessageActionCreators.react.jsx');
var State = require('react-router').State;

var MessagePage = React.createClass({

  mixins: [ State ],

  getInitialState: function() {
    return {
      message: MessageStore.getMessage(),
      errors: []
    };
  },

  componentDidMount: function() {
    MessageStore.addChangeListener(this._onChange);
    MessageActionCreators.loadMessage(this.getParams().messageId);
  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      message: MessageStore.getMessages(),
      errors: MessageStore.getErrors()
    });
  },

  render: function() {
    return (
      <div className="row">
        <div className="message__body">{this.state.message.content}</div>
        <div className="message__body">{this.state.message.author.first_name}</div>
       </div>
     );
  }

});

module.exports = MessagePage;
