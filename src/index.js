import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import { BrowserRouter } from 'react-router-dom'

import thunk from 'redux-thunk'
import reportWebVitals from './reportWebVitals'

import loginReducer from './reducers/loginReducer'
import logoutReducer from './reducers/logoutReducer'
import genreReducer from './reducers/genreReducer'
import storyReducer from './reducers/storyReducer'
import './index.css'

const rootReducer = combineReducers({
  login: loginReducer,
  logout: logoutReducer,
  genre: genreReducer,
  story: storyReducer
})

const composeEnhancers =
  typeof window === `object` &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
);

const store = createStore(
  rootReducer,
  enhancer
)

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>  
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
