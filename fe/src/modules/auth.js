import { history } from 'localhistory'

const type = {
  LOGIN: 'auth/LOGIN_REQUEST',
  LOGOUT: 'auth/Logut',
}


const initialState = {
  token: localStorage.getItem('token'),
  isAuth: localStorage.getItem('token') !== null,
}


export default (state = initialState, action) => {
  let newState = { ...state }
  switch (action.type) {
    case type.LOGIN:
      if (action.payload === null) {
        return initialState
      }
      localStorage.setItem('token', action.payload.token)
      newState = { ...action.payload, isAuth: true }
      return newState
    case type.LOGOUT:
      localStorage.removeItem('token')
      return {
        isAuth: false,
      }
    default:
      return {
        ...state
      }

  }
}


export const LOGIN = authData => ({ type: type.LOGIN, payload: authData })
export const LOGOUT = () => ({ type: type.LOGOUT, payload: '' })
