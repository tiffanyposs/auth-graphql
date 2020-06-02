import React, { Component} from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import CurrentUser from '../queries/CurrentUser';
import Logout from '../mutations/Logout';

class Header extends Component {
  onLogoutClick() {
    // logout and reload CurrentUser data
    this.props.mutate({
      refetchQueries: [{
        query: CurrentUser,
      }],
    });
  }

  renderButtons() {
    const { loading, user } = this.props.data;
    // if the data is still loading
    if (loading) return <div />;

    // if user is signed in
    if (user) {
      return (
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>Logout</a>
        </li>
      );
    }

    // user isn't signed in
    return (
      <div>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </div>
    );
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <ul className="right">
            {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default graphql(Logout)(
  graphql(CurrentUser)(Header)
);
