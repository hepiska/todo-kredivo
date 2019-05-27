import React from 'react'
import ReactDOM from 'react-dom'
import 'dayjs/locale/id'

import App from './app'
import './index.scss'


const Index = () => <App />

ReactDOM.render(<Index />, document.getElementById('index'))
