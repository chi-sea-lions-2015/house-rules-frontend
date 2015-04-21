var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var SessionActionCreators = require('../actions/SessionActionCreators.react.jsx');

var Menu = React.createClass({

  getInitialState: function() {
    return {
      visible: false
    };
  },

  show: function() {
    this.setState({ visible: true });
    document.addEventListener("click", this.hide.bind(this));
  },

  hide: function() {
    document.removeEventListener("click", this.hide.bind(this));
    this.setState({ visible: false });
  },

  render: function() {
    return <div className="menu">
      <div className={(this.state.visible ? "menu-visible " : "") + "menu-" + this.props.alignment}>{this.props.children}</div>
    </div>;
  }
});

var MenuItem = React.createClass({
  navigate: function(hash) {
    window.location.hash = hash;
  },

  render: function() {
    return <div className="menu-item" onClick={this.navigate.bind(this, this.props.hash)}>{this.props.children}</div>;
  }
});

var Header = React.createClass({

  propTypes: {
    isLoggedIn: ReactPropTypes.bool,
    email: ReactPropTypes.string,
    houseName: ReactPropTypes.string
  },

  logout: function(e) {
    e.preventDefault();
    SessionActionCreators.logout();
  },

  showLeft: function() {
    this.refs.left.show();
  },

  hideLeft: function() {
    this.refs.left.hide();
  },

  render: function() {
    var rightNav = this.props.isLoggedIn ? (
      <ul className="right">
        <li className="has-dropdown">
          <a href="#">{this.props.email}</a>
          <ul className="dropdown">
            <li><a href='#' onClick={this.logout}>Logout</a></li>
          </ul>
        </li>
      </ul>
    ) : (
      <ul className="right">
        <li><Link to="login">Login</Link></li>
        <li><Link to="signup">Sign up</Link></li>
      </ul>
    );

console.log(this.props)
    var leftNav = this.props.isLoggedIn ? (
      <ul className="left">
        <div>
          <button className="menu-button" onMouseOver={this.showLeft} onClick={this.showLeft}>{this.props.houseName}</button>

          <Menu ref="left" alignment="left">
            <MenuItem hash="first-page">Fridge</MenuItem>
            <MenuItem hash="second-page">Chores</MenuItem>
            <MenuItem hash="third-page">Events</MenuItem>
            <MenuItem hash="third-page">Inventory</MenuItem>
            <MenuItem hash="third-page">Bills</MenuItem>
            <MenuItem hash="third-page">Rules</MenuItem>
            <MenuItem hash="third-page">Roommates</MenuItem>
            <MenuItem hash="third-page">House Info</MenuItem>
            <MenuItem hash="third-page">Profile</MenuItem>
          </Menu>
        </div>
      </ul>
    ) : (
      <div></div>
    );

    return (
      <nav className="top-bar" data-topbar role="navigation">
        <section className="top-bar-section">
          {leftNav}
          {rightNav}
          <div className="top-logo">House Rules</div>
        </section>
      </nav>
    );
  }
});

module.exports = Header;

