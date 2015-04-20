var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var MessageStore = require('../../stores/MessageStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var MessageActionCreators = require('../../actions/MessageActionCreators.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var timeago = require('timeago');
var APIRoot = "http://localhost:3002";

var Message = React.createClass({
  render: function () {
    return (
      <li className="story">
        <div className="story__body">{this.props.message.content}</div>
        <span className="story__user">{this.props.message.author}</span>
        <span className="story__date"> - {timeago(this.props.message.created_at)}</span>
      </li>
    )
  }
});


var MessageList = React.createClass({
  render: function () {
    var msgs = ( Array.isArray(this.props.messages) ? this.props.messages : this.props.messages.messages )
    var messageNodes = msgs.map(function ( message ) {
      return <Message message={ message } key={ message.id } />
    });

    return (
      <div className="message-list">
        { messageNodes }
      </div>
    )
  }
});

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
      url: APIRoot + "/houses/1/messages",
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
        <h2>talk to your roomies</h2>
        <MessageForm form={ this.state.form } onMessageSubmit={ this.handleMessageSubmit } />
      </div>
    );
  }
});

var MessageForm = React.createClass({
  handleSubmit: function ( event ) {
    event.preventDefault();

    // var content = this.refs.content.getDOMNode().value.trim();

    var content = this.refs.content.getDOMNode().value;
    MessageActionCreators.createMessage(content);


    // validate
    if (!content) {
      return false;
    }

    // submit
    var formData = $( this.refs.form.getDOMNode() ).serialize();
    this.props.onMessageSubmit( formData, APIRoot + "/houses/1/messages" );

    // reset form
    this.refs.content.getDOMNode().value = "";
  },
  render: function () {
    return (
      <form ref="form" className="message-form" action={ APIRoot + "/houses/1/messages" } acceptCharset="UTF-8" method="post" onSubmit={ this.handleSubmit }>
        <p><textarea ref="content" name="message[content]" placeholder="Say something..." /></p>
        <p><button type="submit">post message</button></p>
      </form>
    )
  }
});

module.exports = MessageBox;
