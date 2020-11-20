import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom'

import thunk from 'redux-thunk'
import reportWebVitals from './reportWebVitals'

import bioReducer from './reducers/bioReducer'
import commentReducer from './reducers/commentReducer'
import loginReducer from './reducers/loginReducer'
import logoutReducer from './reducers/logoutReducer'
import storyGenreReducer from './reducers/storyGenreReducer'
import storyReducer from './reducers/storyReducer'
import userReducer from './reducers/userReducer'
import './index.css'

const store = createStore(
  userReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
