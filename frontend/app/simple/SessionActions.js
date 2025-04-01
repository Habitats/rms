import { SessionApi } from './SessionApi'

export const SessionActionCreators = {
  session: () => {
    console.log('SessionActionCreators.session called')
    return async (dispatch) => {
      try {
        const response = await SessionApi.session()
        console.log('Session action response:', response)
        dispatch({
          type: 'LOGIN',
          payload: response.user
        })
      } catch (error) {
        console.error('Session action error:', error)
      }
    }
  },

  login: (credentials) => {
    console.log('SessionActionCreators.login called with:', credentials)
    return async (dispatch) => {
      try {
        const response = await SessionApi.login(credentials)
        console.log('Login action response:', response)
        dispatch({
          type: 'LOGIN',
          payload: response.user
        })
      } catch (error) {
        console.error('Login action error:', error)
      }
    }
  },

  logout: () => {
    console.log('SessionActionCreators.logout called')
    return async (dispatch) => {
      try {
        await SessionApi.logout()
        dispatch({ type: 'LOGOUT' })
      } catch (error) {
        console.error('Logout action error:', error)
      }
    }
  }
} 