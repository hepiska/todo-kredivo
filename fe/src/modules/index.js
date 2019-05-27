import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './auth'
import todos from './todo'

export default combineReducers({
  router: routerReducer,
  todos,
  auth,
})
