import React from 'react'
import styled from 'styled-components'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { colors } from '@pomona/pomona3-ui/lib/constants'
import LoginPage from 'pages/login'
import RegisterPage from 'pages/register'
import MainPage from 'pages/main'
import Header from 'organisms/header'
// import UnAuthRedirect from 'hoc/unAuthRedirect'



const Container = styled.div`
  max-width: 720px;
  z-index: 10;
  height: 100vh;
  margin: 0px auto;
  background-color:${colors.background};
  overflow: hidden;
`

// please arrage path asc alfabetical
const AuthPages = ({ component: Component, ...props }) => {
  const token = localStorage.getItem('token')
  if (token) {
    return (
      <Route
        {...props}
        render={(matchProps) => (
          <Component {...matchProps} />
        )}
      />
    )
  } else {
    return <Redirect to="/login" />
  }
}

const Pages = () => (
  <Container id="indexPage">
    <Header />
    <Switch>
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} /> {/* this have to be last */}
      <AuthPages path="/" component={MainPage} /> {/* this have to be last */}
    </Switch>
  </Container>
)

export default Pages
