import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from "redux";
import thunk from "redux-thunk";
import { reducer as MensReducer } from "../Redux/Mens/reducer";
import { reducer as authReducer } from "./Auth/auth.reducer";

const root_reducer = combineReducers({
  MensReducer,
  authReducer,
});

export const store = legacy_createStore(root_reducer, applyMiddleware(thunk));
