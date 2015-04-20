var React = require('react');
var HouseRulesAPIDispatcher = require('../../dispatcher/HouseRulesAPIDispatcher.js');
var HouseRulesConstants = require('../../constants/HouseRulesConstants.js');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var MessageActionCreators = require('../../actions/MessageActionCreators.react.jsx');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');

var MessageNew = React.createClass({

  componentDidMount: function() {
    if (!SessionStore.isLoggedIn()) {
      RouteActionCreators.redirect('app');
    }
  },

  _onSubmit: function(e) {
    e.preventDefault();
    var content = this.refs.content.getDOMNode().value;
    MessageActionCreators.createMessage(content);
  },

  render: function() {
    return (
      <div className="row">
        <form onSubmit={this._onSubmit} className="new-message">
          // <div className="new-message__title">
          //   <input type="text" placeholder="Title" name="content" ref="title" />
          // </div>
          <div className="new-message__body">
            <textarea rows="10" placeholder="Your message..." name="content" ref="content" />
          </div>
          <div className="new-message__submit">
            <button type="submit">Create</button>
          </div>
         </form>
       </div>
     );
  }

});

module.exports = MessageNew;
