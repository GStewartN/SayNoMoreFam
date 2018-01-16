import React from 'react';
import LoginContainer from './LoginContainer';
import './app.css';

class App extends React.Component {
  state = { user: null };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  render() {
    return (
      <div id="container">
        <LoginContainer />
      </div>
    );
  }
}

export default App;
