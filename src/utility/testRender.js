import { render as defaultRender } from '@testing-library/react'
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
export const render = (children, state = {}) => {
  const store = mockStore({ ...state })
  return defaultRender(
    <Provider store={store}>
      <Router>
        <Switch>
          <Route>
            {children}
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
};