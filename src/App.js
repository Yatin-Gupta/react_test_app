// import Built-Ins
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// import Components
import UserListComponent from "./components/UserListComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";

// import common Component
import NavbarComponent from "./components/common/NavbarComponent";

// import Services
import userService from "./services/userService";

import "./App.css";

class App extends Component {
  getNavigationLinks() {
    const signOutLinks = [
      { path: "/user-details", label: "Users" },
      { path: "/login", label: "Login" },
      { path: "/register", label: "Register" }
    ];
    const signInLinks = [
      { path: "/user-details", label: "Users" },
      { path: "/logout", label: "Logout" }
    ];
    if (userService.userIfExists()) {
      return signInLinks;
    }
    return signOutLinks;
  }

  render() {
    let loggedIn = 0; // falsy
    if (userService.userIfExists()) {
      loggedIn = 1; // truthy
    }
    return (
      <React.Fragment>
        <div className="container">
          <NavbarComponent
            loggedIn={loggedIn}
            links={this.getNavigationLinks()}
          />
          <Switch>
            <Route
              path="/user-details"
              render={props => (
                <UserListComponent
                  {...props}
                  users={userService.getAllUsers}
                  loggedIn={loggedIn}
                />
              )}
            />
            <Route
              path="/register"
              exact
              render={props => (
                <RegisterComponent
                  {...props}
                  addUser={userService.addNewUser}
                />
              )}
            />
            <Route
              path="/login"
              exact
              render={props => <LoginComponent {...props} />}
            />
            <Redirect to="/user-details" from="/" exact />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
