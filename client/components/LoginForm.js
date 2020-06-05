import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import AuthForm from './AuthForm';
import CurrentUser from '../queries/CurrentUser';
import Login from '../mutations/Login';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] }
  }

  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{
        query: CurrentUser,
      }],
    }).then(() => {
      this.setState({ errors: [] });
    }).catch(res => {
      const errors = res.graphQLErrors.map(({ message }) => message);
      this.setState({ errors });
    });
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    )
  }
}

export default graphql(Login)(LoginForm);
