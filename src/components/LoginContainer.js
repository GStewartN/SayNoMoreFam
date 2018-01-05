import React from 'react';

class LoginContainer extends React.Component {
  render () {
    return (
      <div id="LoginContainer" className="inner-container">
        <div id="Header">
          <img src="/assets/icon.png" alt="logo" />
          <h1>Say No More Fam</h1>
        </div>
        <form>
          <p>Sign in or sign up by entering your email and password.</p>
          <input
            type="text"
            placeholder="Your Email"/>
          <input
            type="password"
            placeholder="Your Password"/>
          <button className="red light" type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginContainer;
