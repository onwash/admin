import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { AuthPage, JohnyCash } from "./pages";

// APOLLO 2
// const client = new ApolloClient({
//   // uri: 'http://213.170.70.113/graphql',
//   uri: "http://localhost:3005/graphql",
//   request: (operation) => {
//     //const token = localStorage.getItem('token')
//     operation.setContext({
//       headers: {
//         //authorization: token ? `Bearer ${token}` : '',
//         authorization:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZWI1ODY4MjBhYWQ0ZDA1MmY3NzhiYjIiLCJlbWFpbCI6IkRhZHNhZGFzZEBtYS5jYSIsImlhdCI6MTU5NDIyNTM5OSwiZXhwIjoxNTk0MzExNzk5fQ.geWa34LW1mQ4m1KzwkUlFHhEaQS4ZQ2V8D2wrQe_z4g",
//         app: `onwaShapp`,
//       },
//     });
//   },
// });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:3005/graphql",
  headers: {
    app: `onwaShapp`,
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZWI1ODY4MjBhYWQ0ZDA1MmY3NzhiYjIiLCJlbWFpbCI6IkRhZHNhZGFzZEBtYS5jYSIsImlhdCI6MTU5NDg0NjIyNCwiZXhwIjoxNTk0OTMyNjI0fQ.6A_oWBzXApDy8h4V3mwVHwKf2jqnGzo0U6FrtUSFFkM",
  },
});

const App = () => {
  return (
    <Switch>
      <Route path="/auth">
        <AuthPage />
      </Route>
      <Route path="/asdasdasdasdsa">
        <JohnyCash />
      </Route>
    </Switch>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
