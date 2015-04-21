var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var EventStore = require('../../stores/EventStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var EventActionCreators = require('../../actions/EventActionCreators.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var timeago = require('timeago');
var APIRoot = "http://localhost:3002";

var Event = React.createClass({
  render: function () {
    return (
      <li className="story">
        <div className="story__body">{this.props.event.name}</div>
        <div className="story__date">{this.props.event.date}</div>
        <div className="story__description">{this.props.event.description}</div>
      </li>
    )
  }
});

var EventList = React.createClass({
  render: function () {
    var eventNodes = this.props.events.map(function ( event ) {
      return <Event event={ event } key={ event.id } />
    });

    return (
      <div className="event-list">
        { eventNodes }
      </div>
    )
  }
});

var EventBox = React.createClass({

  getInitialState: function() {
    return {
      events: EventStore.getAllEvents(),
      errors: []
    };
  },

  componentDidMount: function() {
    EventStore.addChangeListener(this._onChange);
    EventActionCreators.loadEvents();
  },

  componentWillUnmount: function() {
    EventStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      events: EventStore.getAllEvents(),
      errors: EventStore.getErrors()
    });
  },

  render: function () {
    return (
      <div className="event-box">
        <img src={ this.props.imgSrc } alt={ this.props.imgAlt } />
        <EventList events={ this.state.events } />
        <hr />
        <h4>Create an Event</h4>
        <EventForm form={ this.state.form } />
        </div>
    );
  }
});

var EventForm = React.createClass({
  handleSubmit: function ( event ) {
    event.preventDefault();
    var name = this.refs.name.getDOMNode().value;
    var date = this.refs.date.getDOMNode().value;
    var description = this.refs.description.getDOMNode().value;
    EventActionCreators.createEvent(name, date, description);

    // var formData = $( this.refs.form.getDOMNode() ).serialize();
    // ItemActionCreators.createItem(formData)
    if (!name) {
      return false;
    }
    if (!date) {
      return false;
    }

    // reset form
    this.refs.name.getDOMNode().value = "";
    this.refs.date.getDOMNode().value = "";
    this.refs.description.getDOMNode().value = "";

  },
  render: function () {
    return (
      <form ref="form" className="event-form" method="post" onSubmit={ this.handleSubmit }>
        <fieldset>
          <legend>Create an Event</legend>
          <p><textarea ref="name" name="event[name]" placeholder="What's the event name?" /></p>
          <p><textarea ref="date" name="event[date]" placeholder="What date?" /></p>
          <p><textarea ref="description" name="event[description]" placeholder="What description?" /></p>
          <p><button type="submit">Post Event</button></p>
        </fieldset>
      </form>
    )
  }
});

module.exports = EventBox;
