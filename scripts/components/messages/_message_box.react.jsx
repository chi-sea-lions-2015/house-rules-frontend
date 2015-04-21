var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var MessageStore = require('../../stores/MessageStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var MessageActionCreators = require('../../actions/MessageActionCreators.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var timeago = require('timeago');
var RouteHandler = Router.RouteHandler

var MessageBox = React.createClass({

  // handleMessageSubmit: function(message) {
  //   $.ajax({
  //     url: this.props.url,
  //     dataType: 'json',
  //     type: 'POST',
  //     data: message,
  //     success: function(data) {
  //       console.log("YAYYYA!")

  //     }.bind(this),
  //     error: function(xhr, status err) {
  //       console.error(this.props.url status, err.toString());
  //     }.bind(this)
  //   });
  // },

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

  render: function () {
    console.log(this.state);
    console.log("state");
    return (
      <div className="message-box">
      <div className="row">
      <div class="small-6 large-2 columns"><br /></div>
      <div class="small-6 large-8 columns">
      <img src={ this.props.imgSrc } alt={ this.props.imgAlt } />
      <MessageList messages={ this.state.messages } />
      <hr />
      <h2>talk to your roomies</h2>
      <MessageForm onMessageSubmit={this.handleMessageSubmit} form={ this.state.form } />
      <RouteHandler/>
      </div>
      <div className="large-3 columns"><br /></div>
      </div></div>
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
      <li className="story">
      <div className="story__body">{this.props.message.content}</div>

      {console.log(this.props.message.content)}
      {console.log(this)}

      <span className="story__user">{this.props.message.author}</span>
      <span className="story__date"> - {timeago(this.props.message.created_at)}</span>
      </li>
      )
  }
});


var MessageForm = React.createClass({

  handleSubmit: function ( event ) {
    event.preventDefault();
    var content = this.refs.content.getDOMNode().value;
    MessageActionCreators.createMessage(content);

    // validate
    if (!content) {
      return false;
    }

    // reset form
    this.refs.content.getDOMNode().value = "";
  },

  render: function () {
    return (
      <form ref="form" className="message-form" method="post" onSubmit={ this.handleSubmit }>
        <fieldset>
          <legend>Create a Message</legend>
          <p><textarea ref="content" name="message[content]" placeholder="Say something..." /></p>
          <p><button type="submit">Post message</button></p>
        </fieldset>
      </form>
      )
  }
});




module.exports = MessageBox;
