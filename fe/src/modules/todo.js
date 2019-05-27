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
    case type.EDIT:
      newState = [...newState].map(tod => {
        if (tod.id === action.payload.id) {
          return action.payload
        }
        return tod
      })
      return newState
    case type.DELETE:
      newState = [...newState].filter(tod => tod.id !== action.payload.id)
      return newState
    default:
      return [...state]



  }
}


export const getall = (query) => {
  const qs = obj2qstr(query)
  return (dispatch) => authServices.get(`/todo/user${qs}`).then(res => dispatch({ type: type.GETALL, payload: res.data.data }))
}

export const editTodo = (id, data) => (dispatch) => authServices.put(`/todo/${id}`, data).then(res => dispatch({ type: type.EDIT, payload: res.data.data }))

export const deleteTodo = (id) => (dispatch) => authServices.delete(`/todo/${id}`).then(() => dispatch({ type: type.DELETE, payload: { id } }))
// export const LOGOUT = () => ({ type: type.LOGOUT, payload: '' })
