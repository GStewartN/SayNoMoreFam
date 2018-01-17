import React from 'react';
import { Route, withRouter } from "react-router-dom";
import LoginContainer from './LoginContainer';
import ChatContainer from "./ChatContainer";
import User from "./User";
import './app.css';

class App extends React.Component {
  state = { user: null };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.props.history.push("/login");
      }
    });
  }

  render() {
    return (
      <div id="container">
        <Route path="/login" component={LoginContainer} />
        <Route exact path="/" component={ChatContainer} />
        <Route path="/users/:id" component={User} />
      </div>
    );
  }
}

export default withRouter(App);
