import React, { useEffect } from 'react'
import styled from 'styled-components'
import { getall } from 'modules/todo'
import { Wrapper, } from 'atoms'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


const MainPage = (props) => {
  useEffect(() => { props.getall('') }, [])
  return (
    <Wrapper margin='72px 0px' >
      main page bitch
    </Wrapper >
  )
}


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getall,
    },
    dispatch,
  )

const mapStateToProps = state => ({
  todos: state.todos,
})
export default connect(mapStateToProps, mapDispatchToProps)(MainPage)