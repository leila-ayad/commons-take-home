import React from "react";
import { Provider } from "react-redux";

import { Authentication } from "./features/auth/Authentication";
import { configureStore } from "./store/Store";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Challenges } from "./features/challenges/Challenges";

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/challenges">
              <Challenges />
            </Route>
            <Route path="">
              <Authentication />
            </Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}
