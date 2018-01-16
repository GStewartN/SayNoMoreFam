import React from 'react';
import Header from './Header';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ error: '' });
    if (this.state.email && this.state.password) {
      this.login();
    } else {
      this.setState({ error: 'Please fill in both fields.' });
    }
  };

  login() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        this.onLogin();
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          this.signup();
        } else {
          this.setState({ error: 'Error logging in.' });
        }
      });
  }

  signup() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        this.onLogin();
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: 'Error signing up.' });
      });
  }

  onLogin() {
    this.props.history.push("/");
  }

  render () {
    return (
      <div id="LoginContainer" className="inner-container">
        <Header />
        <form onSubmit={this.handleSubmit}>
          <p>Sign in or sign up by entering your email and password.</p>
          <input
            name="email"
            type="text"
            onChange={this.handleInputChange}
            value={this.state.email}
            placeholder="Your Email"/>
          <input
            name="password"
            type="password"
            onChange={this.handleInputChange}
            value={this.state.password}
            placeholder="Your Password"/>
          <p className="error">{this.state.error}</p>
          <button className="red light" type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginContainer;
