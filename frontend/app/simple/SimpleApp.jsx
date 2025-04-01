import React from 'react'
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { SessionActionCreators } from './SessionActions'

// Simple Home component
const Home = () => {
  console.log('Rendering Home')
  return (
    <div style={{ padding: '20px' }}>
      <h1>Home Page</h1>
      <p>Welcome to the simplified app!</p>
    </div>
  )
}

// Login component
const Login = ({ login }) => {
  console.log('Rendering Login')
  return (
    <div style={{ padding: '20px' }}>
      <h1>Login</h1>
      <button onClick={() => login({ username: 'test', password: 'test' })}>
        Login
      </button>
    </div>
  )
}

// Simple Counter component
const Counter = ({ count, increment, decrement, logout }) => {
  console.log('Rendering Counter with count:', count)
  return (
    <div style={{ padding: '20px' }}>
      <h1>Counter Page</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={logout} style={{ marginLeft: '10px' }}>Logout</button>
    </div>
  )
}

// Protected Route component
const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  console.log('ProtectedRoute, isAuthenticated:', isAuthenticated)
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

// Connect components to Redux
const ConnectedLogin = connect(
  null,
  dispatch => ({
    login: (credentials) => {
      console.log('Login clicked with:', credentials)
      dispatch(SessionActionCreators.login(credentials))
    }
  })
)(Login)

const ConnectedCounter = connect(
  state => {
    console.log('Counter mapStateToProps called with state:', state)
    return { count: state.count }
  },
  dispatch => ({
    increment: () => {
      console.log('Increment clicked')
      dispatch({ type: 'INCREMENT' })
    },
    decrement: () => {
      console.log('Decrement clicked')
      dispatch({ type: 'DECREMENT' })
    },
    logout: () => {
      console.log('Logout clicked')
      dispatch(SessionActionCreators.logout())
    }
  })
)(Counter)

// Main App component
const SimpleApp = ({ isAuthenticated }) => {
  console.log('Rendering SimpleApp, isAuthenticated:', isAuthenticated)
  return (
    <div>
      <nav style={{ padding: '20px', background: '#f0f0f0' }}>
        {isAuthenticated ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/counter" style={{ marginLeft: '20px' }}>Counter</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={ConnectedLogin} />
        <ProtectedRoute
          path="/counter"
          component={ConnectedCounter}
          isAuthenticated={isAuthenticated}
        />
        <Redirect from="/" to={isAuthenticated ? "/counter" : "/login"} />
      </Switch>
    </div>
  )
}

// Connect main app to Redux
const ConnectedSimpleApp = connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated
  })
)(SimpleApp)

export default ConnectedSimpleApp 