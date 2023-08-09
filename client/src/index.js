import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import App from './App';

const client = new ApolloClient({
  uri: 'YOUR_GRAPHQL_ENDPOINT', // Replace with your GraphQL API URL
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

