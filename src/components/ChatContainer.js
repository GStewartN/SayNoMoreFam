import React from 'react';
import Header from "./Header";

class ChatContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    firebase.auth().signOut();
  };

  render () {
    return (
      <div id="ChatContainer">
        <Header>
          <button className="red" onClick={this.handleLogout}>Logout</button>
        </Header>
        <h1>Hello from ChatContainer</h1>
      </div>
    );
  }
}

export default ChatContainer;
