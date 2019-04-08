import { createStore, applyMiddleware, compose } from "redux";
import curencyReducer from "../redux/reducers/curencyReducer";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  currency: null
};

function configureStore(state = initialState) {
  debugger;

  return createStore(
    curencyReducer,
    state,
    composeEnhancers(applyMiddleware(thunk))
  );

  // return createStore(
  //   curencyReducer,
  //   state,
  //   applyMiddleware(thunk)
  // );
}
export default configureStore;
