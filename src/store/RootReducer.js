import { combineReducers } from "redux";

import challenges from "../features/challenges/challenges.redux";
import { LoginReducer } from "../features/auth/auth.redux";

export const RootReducer = combineReducers({
  auth: LoginReducer,
  challenges
});
