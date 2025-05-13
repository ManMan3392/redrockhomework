import { createStore, applyMiddleware, compose } from "redux"
import reducer from './reducer'
import { thunk } from "redux-thunk"
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose;
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))