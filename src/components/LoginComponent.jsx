import React, { Component } from "react";

// import components
import InputComponent from "./common/InputComponent";

// App Utilities
import _ from "lodash";
import Joi from "joi-browser";
import validator from "../utilities/validation";

class LoginComponent extends Component {
  state = {
    account: {
      username: "",
      password: ""
    },
    errors: {}
  };
  schema = {
    username: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required()
      .label("Username"),
    password: Joi.string()
      .min(4)
      .max(30)
      .required()
      .label("Password")
  };

  submitHandler = e => {
    e.preventDefault();
    //console.log(this.username.current.value); //this.username.current got reference for HTML Input element
    const formErrors = validator.validateAllFields(
      this.state.account,
      this.schema
    );
    let errors = {};
    formErrors.forEach(function(error) {
      errors[error.key] = error.value;
    });
    this.setState({ errors });
    //if (_.isEmpty(errors)) {
    //this.props.loginUser(this.state.account);
    //}
    //window.location = "/";
    // call to server made
  };

  getErrorByField = field => {
    if (_.isEmpty(this.state.errors) || this.state.errors[field] === undefined)
      return "";
    return this.state.errors[field];
  };

  changeHandler = e => {
    let { account } = this.state;
    let { name: targetName, value: targetValue } = e.currentTarget;
    account[targetName] = targetValue;
    let errors = { ...this.state.errors };
    let schema = {
      [targetName]: this.schema[targetName]
    };
    let formFieldError = validator.validateField(
      { [targetName]: targetValue },
      schema
    );
    if (_.isEmpty(formFieldError)) {
      delete errors[targetName];
    } else {
      errors[formFieldError.key] = formFieldError.value;
    }
    this.setState({ account, errors }); // stands for ({account:account})
  };

  getErrorByField = field => {
    if (_.isEmpty(this.state.errors) || this.state.errors[field] === undefined)
      return "";
    return this.state.errors[field];
  };

  getButton(label) {
    if (
      validator.validateAllFields(this.state.account, this.schema).length > 0
    ) {
      return (
        <button type="submit" className="btn btn-default" disabled>
          {label}
        </button>
      );
    } else {
      return (
        <button type="submit" className="btn btn-default">
          {label}
        </button>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form className="form-horizontal" onSubmit={this.submitHandler}>
          <InputComponent
            label={"Email:"}
            id={"email"}
            placeholder={"Enter username/email"}
            value={this.state.account.username}
            name={"username"}
            type={"text"}
            onChange={this.changeHandler}
            errors={this.getErrorByField("username")}
          />
          <InputComponent
            label={"Password:"}
            id={"password"}
            placeholder={"Enter Password"}
            value={this.state.account.password}
            name={"password"}
            type={"password"}
            onChange={this.changeHandler}
            errors={this.getErrorByField("password")}
          />
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              {this.getButton("Login")}
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginComponent;
