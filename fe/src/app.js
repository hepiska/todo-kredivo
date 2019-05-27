import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import Pages from 'pages'
import store from './store'




const App = () => (
  <Provider store={store}>
    <Router basename="/">
      <Pages />
    </Router>
  </Provider>
)

export default App
