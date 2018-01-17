import React from "react";
import Header from "./Header";

class User extends React.Component {
  render() {
    return (
      <div id="UserContainer">
        <Header />
        <h1>Hello from User for User {this.props.match.params.id}</h1>
      </div>
    );
  }
}

export default User;
