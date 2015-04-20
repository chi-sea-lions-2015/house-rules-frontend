var React = require('react');
var HouseRulesAPIDispatcher = require('../../dispatcher/HouseRulesAPIDispatcher.js');
var HouseRulesConstants = require('../../constants/HouseRulesConstants.js');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var RuleActionCreators = require('../../actions/RuleActionCreators.react.jsx');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');

var RuleNew = React.createClass({

  componentDidMount: function() {
    if (!SessionStore.isLoggedIn()) {
      RouteActionCreators.redirect('app');
    }
  },

  _onSubmit: function(e) {
    e.preventDefault();
    var content = this.refs.content.getDOMNode().value;
    RuleActionCreators.createRule(content);
  },

  render: function() {
    return (
      <div className="row">
        <form onSubmit={this._onSubmit} className="new-rule">
          <div className="new-rule__body">
            <textarea rows="10" placeholder="Your rule..." name="content" ref="content" />
          </div>
          <div className="new-rule__submit">
            <button type="submit">Create</button>
          </div>
         </form>
       </div>
     );
  }

});

module.exports = RuleNew;
