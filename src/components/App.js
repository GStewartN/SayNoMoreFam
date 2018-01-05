import React from 'react';
import LoginContainer from './LoginContainer';
import './app.css';

class App extends React.Component {

greeting = "Hello from React!!"

  render() {
    return (
      <div id="container" className="inner-container">
        <LoginContainer />
      </div>
    );
  }
}

export default App;
