import React, { Component } from "react";

class UserListComponent extends Component {
  state = {
    users: []
  };
  async componentDidMount() {
    let users = await this.props.users();
    this.setState({ users });
  }
  renderBodyConditionally() {
    const { users } = this.state;
    if (users.length === 0) {
      if (!this.props.loggedIn) {
        return <h3>Please Login to get Users List</h3>;
      } else {
        return <h3>No User found!!</h3>;
      }
    } else {
      return (
        <div className="row">
          <div className="col" />
        </div>
      );
    }
  }
  render() {
    console.log(this.props.users());
    return null;
    return <React.Fragment>{this.renderBodyConditionally()}</React.Fragment>;
  }
}

export default UserListComponent;
