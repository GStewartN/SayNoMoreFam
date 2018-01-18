import React from 'react';
import { Route, withRouter } from "react-router-dom";
import LoginContainer from './LoginContainer';
import ChatContainer from "./ChatContainer";
import User from "./User";
import './app.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      messages: []
    };

    this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
    this.onMessage = this.onMessage.bind(this)
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.props.history.push("/login");
      }
    });
    firebase.database().ref("/messages").on("value", snapshot => {
      this.onMessage(snapshot);
    });
  }

  onMessage = snapshot => {
    const messages = Object.keys(snapshot.val()).map(key => {
      const msg = snapshot.val()[key];
      msg.id = key;
      return msg;
    });
    console.log(messages);
  };

  handleSubmitMessage = msg => {
    const data = {
      msg,
      author: this.state.user.email,
      user_id: this.state.user.uid,
      timestamp: Date.now()
    };
    firebase.database().ref("messages/").push(data);
  }

  render() {
    return (
      <div id="container">
        <Route path="/login" component={LoginContainer} />
        <Route
          exact
          path="/"
          render={() => (
            <ChatContainer
              onSubmit={this.handleSubmitMessage}
            />
          )}
        />
        <Route path="/users/:id" component={User} />
      </div>
    );
  }
}

export default withRouter(App);
