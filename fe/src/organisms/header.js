import React, { useState } from 'react'
import styled from 'styled-components'
import { Wrapper } from 'atoms'
import Font from 'atoms/font'
import Button from 'atoms/button'
import Modal from 'molecules/modal'
import { shadows, colors } from 'utils/constants'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { LOGOUT } from 'modules/auth'
import AddTodoModal from 'organisms/addTodoModal'

const FixedWrapper = styled(Wrapper)`
top:0px;
left: 0px;
`



const Header = (props) => {
  const [isModalOpen, setModal] = useState(false)
  const logout = () => {
    props.LOGOUT()
    props.history.push('/login')
  }

  const closeModal = () => {
    setModal(false)
  }

  const openModal = () => {
    setModal(true)
  }

  return (
    <FixedWrapper
      position='fixed'
      justify='space-between'
      radius='0px'
      width='100vw'
      padding='20px'
      dPadding='20px 20%'
      direction='row'
      shadow={shadows.idle}
    >
      <AddTodoModal isOpen={isModalOpen} closeModal={closeModal} />
      <Wrapper>
        <Font color={colors.thisBlue} size='22px'>  My list </Font>
      </Wrapper>
      {props.isAuth && (
        <Wrapper direction='row'>
          <Button size='content' onClick={openModal} padding='8px 12px' margin='0px 8px' background={colors.thisBlue}>add todos</Button>
          <Button size='content' onClick={logout} padding='8px 12px' margin='0px 8px' background={colors.redError}>logout</Button>
        </Wrapper>
      )}
    </FixedWrapper>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      LOGOUT,
    },
    dispatch,
  )

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps))(Header)
