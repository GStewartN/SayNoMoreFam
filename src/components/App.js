import React from 'react';
import { Route, withRouter } from "react-router-dom";
import LoginContainer from './LoginContainer';
import ChatContainer from "./ChatContainer";
import User from "./User";
import NotificationResource from "../resources/NotificationResource";
import './app.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      messages: [],
      messagesLoaded: false
    };

    this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
    this.onMessage = this.onMessage.bind(this)
  }

  componentDidMount() {
    this.notifications = new NotificationResource(
      firebase.messaging(),
      firebase.database()
    );
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        this.listenForMessages();
        this.notifications.changeUser(user);
      } else {
        this.props.history.push("/login");
      }
    });
    firebase.database().ref("/messages").on("value", snapshot => {
      this.onMessage(snapshot);
      if (!this.state.messagesLoaded) {
        this.setState({ messagesLoaded: true });
      }
    });
  }

  listenForMessages = () => {
    firebase
      .database()
      .ref('/messages')
      .on('value', snapshot => {
        this.onMessage(snapshot);
        if (!this.state.messagesLoaded) {
          this.setState({ messagesLoaded: true });
        }
      });
  };

  onMessage = snapshot => {
    const messages = Object.keys(snapshot.val()).map(key => {
      const msg = snapshot.val()[key];
      msg.id = key;
      return msg;
    });
    this.setState({ messages });
  }

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
              messagesLoaded={this.state.messagesLoaded}
              onSubmit={this.handleSubmitMessage}
              user={this.state.user}
              messages={this.state.messages}
            />
          )}
        />
        <Route
          path="/users/:id"
          render={({ history, match }) => (
            <User
              messagesLoaded={this.state.messagesLoaded}
              messages={this.state.messages}
              userID={match.params.id}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
