import React, { useState } from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { AuthPage, JohnyCash } from "./pages";

const client = new ApolloClient({
  // uri: 'http://213.170.70.113/graphql',
  uri: "http://localhost:3005/graphql",
  request: (operation) => {
    //const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        //authorization: token ? `Bearer ${token}` : '',
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZWI1ODY4MjBhYWQ0ZDA1MmY3NzhiYjIiLCJlbWFpbCI6IkRhZHNhZGFzZEBtYS5jYSIsImlhdCI6MTU5NDIyNTM5OSwiZXhwIjoxNTk0MzExNzk5fQ.geWa34LW1mQ4m1KzwkUlFHhEaQS4ZQ2V8D2wrQe_z4g",
        app: `onwaShapp`,
      },
    });
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
