var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var MessageStore = require('../../stores/MessageStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var MessageActionCreators = require('../../actions/MessageActionCreators.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var timeago = require('timeago');

var MessagesPage = React.createClass({

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

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (
      <div>
        {errors}
        <div className="row">
          <MessagesList messages={this.state.messages} />
        </div>
      </div>
    );
  }
});

var MessageItem = React.createClass({
  render: function() {
    return (
      <li className="story">
        // <div className="story__title">
        //   <Link to="message" params={ {messageId: this.props.message.id} }>
        //     {this.props.s.title}
        //   </Link>
        // </div>
        <div className="message__body">{this.props.message.content}...</div>
        // <span className="story__user">{this.props.story.user.username}</span>
        // <span className="story__date"> - {timeago(this.props.story.created_at)}</span>
      </li>
      );
  }
});

var MessagesList = React.createClass({
  render: function() {
    return (
      <ul className="large-8 medium-10 small-12 small-centered columns">
        {this.props.messages.map(function(message, index){
          return <MessageItem message={message} key={"message-" + index}/>
        })}
      </ul>
    );
  }
});

module.exports = MessagesPage;

