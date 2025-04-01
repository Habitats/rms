import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import SimpleApp from './SimpleApp'
import { SessionActionCreators } from './SessionActions'

// Create a simple reducer
const initialState = {
  count: 0,
  session: {
    isAuthenticated: false,
    user: null
  }
}

function reducer(state = initialState, action) {
  console.log('Reducer called with action:', action.type)
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 }
    case 'DECREMENT':
      return { ...state, count: state.count - 1 }
    case 'LOGIN':
      return {
        ...state,
        session: {
          isAuthenticated: true,
          user: action.payload
        }
      }
    case 'LOGOUT':
      return {
        ...state,
        session: {
          isAuthenticated: false,
          user: null
        }
      }
    default:
      return state
  }
}

// Create store with Thunk middleware
const store = createStore(reducer, applyMiddleware(thunk))
console.log('Store created:', store)

// Check initial session
store.dispatch(SessionActionCreators.session())

// Render the app
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <SimpleApp />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
) 