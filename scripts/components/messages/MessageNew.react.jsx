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
        <form onSubmit={this._onSubmit} className="new-story">
          <div className="new-story__body">
            <textarea rows="10" placeholder="Your story..." name="content" ref="content" />
          </div>
          <div className="new-story__submit">
            <button type="submit">Create</button>
          </div>
         </form>
       </div>
     );
  }

});

module.exports = MessageNew;
