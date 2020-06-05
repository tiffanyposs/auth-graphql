import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
// import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';

import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';

import './style.css';

// const networkInterface = createNetworkInterface({
//   uri: '/graphql',
//   opts: {
//     credentials: 'same-origin',
//   }
// });

const client = new ApolloClient({
  dataIdFromObject: o => o.id, // every record has an id to identify it by
  // networkInterface,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="login" component={LoginForm} />
          <Route path="signup" component={SignupForm} />
          <Route path="dashboard" component={Dashboard} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
