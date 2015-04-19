var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var MessageStore = require('../../stores/MessageStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var MessageActionCreators = require('../../actions/MessageActionCreators.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var timeago = require('timeago');

var MessageBox = React.createClass({

  getInitialState: function() {
    return {
      messages: MessageStore.getAllMessages(),
      errors: []
    };
  },

  componentDidMount: function() {
    MessageStore.addChangeListener(this._onChange);
    MessageActionCreators.loadMessages();
  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      messages: MessageStore.getAllMessages(),
      errors: MessageStore.getErrors()
    });
  },

  handleMessageSubmit: function ( formData, action ) {
    $.ajax({
      data: formData,
      url: action,
      type: "POST",
      dataType: "json",
      success: function ( data ) {
        this.setState({ messages: data });
      }.bind(this)
    });
  },

  render: function () {
    return (
      <div className="message-box">
        <img src={ this.props.imgSrc } alt={ this.props.imgAlt } />
        <MessageList messages={ this.state.messages } />
        <hr />
        <h2>post a message</h2>
        <MessageForm form={ this.state.form } onMessageSubmit={ this.handleMessageSubmit } />
      </div>
    );
  }
});

var MessageList = React.createClass({
  render: function () {
    var messageNodes = this.props.messages.map(function ( message ) {
      return <Message message={ message } key={ message.id } />
    });

    return (
      <div className="message-list">
        { messageNodes }
      </div>
    )
  }
});

var Message = React.createClass({
  render: function () {
    return (
      <div>
        <h4>Someone said: </h4>
        <p>{ this.props.message.content }</p>
      </div>
    )
  }
});


var MessageForm = React.createClass({
  handleSubmit: function ( event ) {
    event.preventDefault();
    var content = this.refs.content.getDOMNode().value.trim();

    // validate
    if (!content) {
      return false;
    }

    // submit
    var formData = $( this.refs.form.getDOMNode() ).serialize();
    this.props.onMessageSubmit( formData, this.props.form.action );

    // reset form
    this.refs.content.getDOMNode().value = "";
  },
  render: function () {
    return (
      <form ref="form" className="message-form" acceptCharset="UTF-8" method="post" onSubmit={ this.handleSubmit }>
        <p><textarea ref="content" name="message[content]" placeholder="Say something..." /></p>
        <p><button type="submit">Post message</button></p>
      </form>
    )
  }
});

module.exports = MessageBox;
