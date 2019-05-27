import { history } from 'localhistory'
import { obj2qstr } from 'utils/helper'
import { authServices } from 'utils/services'

const type = {
  GETALL: 'todo/getall',
  EDIT: 'todo/edit',
  DELETE: 'todo/delete'
}


const initialState = []


export default (state = initialState, action) => {
  let newState = [...state]
  switch (action.type) {
    case type.GETALL:
      newState = [...action.payload]
      return newState
    default:
      return [...state]



  }
}


export const getall = (query) => {
  const qs = obj2qstr(query)
  return (dispatch) => authServices.get(`/todo/user${qs}`).then(res => dispatch({ type: type.GETALL, payload: res.data.data }))
}
// export const LOGOUT = () => ({ type: type.LOGOUT, payload: '' })
