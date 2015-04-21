var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var ChoreStore = require('../../stores/ChoreStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var ChoreActionCreators = require('../../actions/ChoreActionCreators.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var timeago = require('timeago');

var ChoreBox = React.createClass({

  getInitialState: function() {
    return {
      chores: ChoreStore.getAllChores(),
      errors: []
    };
  },

  componentDidMount: function() {
    ChoreStore.addChangeListener(this._onChange);
    ChoreActionCreators.loadChores();
  },

  componentWillUnmount: function() {
    ChoreStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      chores: ChoreStore.getAllChores(),
      errors: ChoreStore.getErrors()
    });
  },

  render: function () {
    return (
      <div className="chore-box">
      <div className="row">
        <div className="large-3 columns"><br /></div>
        <div className="large-6 columns">
        <h4>House Chores: </h4>
        <ChoreList chores={ this.state.chores } />
        <ChoreForm form={ this.state.form } onChoreSubmit={ this.handleChoreSubmit } />
        </div>
        <div className="large-3 columns"><br /></div>
      </div>

      </div>
    );
  }
});

var ChoreList = React.createClass({
  render: function () {
    var choreNodes = this.props.chores.map(function ( chore ) {
      return <Chore chore={ chore } key={ chore.id } />
    });

    return (
      <div className="chore-list row">
        { choreNodes }
      </div>
    )
  }
});

var Chore = React.createClass({
  render: function () {
    return (
      <div>
      <p>{ this.props.chore.task }</p>
      </div>
    )
  }
});

var ChoreForm = React.createClass({
  handleSubmit: function ( event ) {
    event.preventDefault();
    var task = this.refs.task.getDOMNode().value.trim();
    ChoreActionCreators.createChore(task);


    // validate
    if (!task) {
      return false;
    }

    // submit

    // reset form
    this.refs.task.getDOMNode().value = "";
  },
  render: function () {
    return (
      <form ref="form" className="chore-form" method="post" onSubmit={ this.handleSubmit }>
        <fieldset>
          <legend>Create a Chore</legend>
          <p><textarea ref="task" name="chore[task]" placeholder="What's your chore?" /></p>
          <p><button type="submit">Create Chore</button></p>
        </fieldset>
      </form>
    )
  }
});

module.exports = ChoreBox;
