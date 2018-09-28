import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class NavbarComponent extends Component {
  state = {
    links: []
  };
  componentDidMount() {
    this.setState({ links: this.props.links });
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Site
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {this.props.links.map(link => {
              return (
                <React.Fragment>
                  <li className="nav-item active">
                    <NavLink className="nav-link" to={link.path}>
                      {link.label}
                    </NavLink>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavbarComponent;
