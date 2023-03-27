import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";

import { RootReducer } from "./RootReducer";

export const configureStore = (initialState = {}) => {
  const enhancer = compose(applyMiddleware(thunkMiddleware));

  return createStore(RootReducer, initialState, enhancer);
};
