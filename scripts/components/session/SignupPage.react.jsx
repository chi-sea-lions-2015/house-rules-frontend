var React = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');

var SignupPage = React.createClass({

  getInitialState: function() {
    return { errors: [] };
  },
 
  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ errors: SessionStore.getErrors() });
  },

  _onSubmit: function(e) {
    e.preventDefault();
    this.setState({ errors: [] });
    var username = this.refs.username.getDOMNode().value;
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    var passwordConfirmation = this.refs.passwordConfirmation.getDOMNode().value;
    var firstName = this.refs.firstName.getDOMNode().value;
    var lastName = this.refs.lastName.getDOMNode().value;
    var phone = this.refs.phone.getDOMNode().value;    
    if (password !== passwordConfirmation) {
      this.setState({ errors: ['Password and password confirmation should match']});
    } else {
      SessionActionCreators.signup(username, email, password, passwordConfirmation, firstName, lastName, phone);
    }
  },

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (
      <div>
        {errors}
        <div className="row">
          <div className="card card--login small-10 medium-6 large-4 columns small-centered">
            <form onSubmit={this._onSubmit}>
              <div className="card--login__field">
                <label name="first-name">First Name</label>
                <input type="text" name="first-name" ref="firstName" />
                </div> 
              <div className="card--login__field">
                <label name="email">Email</label>
                <input type="text" name="email" ref="email" /> 
                </div>
              <div className="card--login__field">
                <label name="password">Password</label>
                <input type="password" name="password" ref="password" /> 
                </div>
              <div className="card--login__field">
                <label name="password-confirmation">Password Confirmation</label>
                <input type="password-confrimation" name="password-confirmation" ref="passwordConfirmation" /> 
              </div>
               <div className="card--login__field">
                <label name="username">Username</label>
                <input type="text" name="username" ref="username" /> 
                </div>
              <div className="card--login__field">
                <label name="last-name">Last Name</label>
                <input type="test" name="last-name" ref="lastName" />
              </div>
              <div className="card--login__field">
                <label name="phone">Phone</label>
                <input type="text" name="phone" ref="phone" />
              </div>
              <button type="submit" className="card--login__submit">Signup</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SignupPage;

