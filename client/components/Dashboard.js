import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import CurrentUser from '../queries/CurrentUser';

class Dashboard extends Component {
  componentWillUpdate(nextProps) {
    // you can only see this page if you're logged in
    if (!nextProps.data.user) {
      hashHistory.push('/');
    }
  }
  render() {
    return (
      <div>
        You should only see this if you logged in
      </div>
    );
  }
}

export default graphql(CurrentUser)(Dashboard);
