import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import CurrentUser from '../queries/CurrentUser';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  componentWillUpdate(nextProps) {
    // redirect to dashboard if user becomes signed in
    if (nextProps.data.user && !this.props.doNotRedirect) {
      hashHistory.push('/dashboard');
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;

    // mutation
    this.props.onSubmit({
      email,
      password,
    });

    this.setState({
      email: '',
      password: '',
    });
  }

  render() {
    return (
      <div className="row">
        <form onSubmit={this.onSubmit.bind(this)} className="col s6">
          <div className="input-field">
            <input
              placeholder="email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="input-field">
            <input
              placeholder="password"
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <div className="errors">
            {this.props.errors.map(err => <div key={err}>{err}</div>)}
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
    )
  }
}

export default graphql(CurrentUser)(AuthForm);
