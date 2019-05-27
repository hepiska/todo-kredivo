import React from 'react'
import ReactDOM from 'react-dom'
import { colors, } from '@pomona/pomona3-ui/lib/constants'
import { ImageWrapper } from 'atoms'
import styled from 'styled-components'


const Modal = styled.div`
    display: ${props => (props.isOpen ? 'flex' : 'none')}; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 10001; /* Sit on top */
    left: 0;
    top: 0;
    width: 100vw; /* Full width */
    justify-content: center;
    align-items:center;
    height: 100vh; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: ${colors.disableText}; /* Black w/ opacity */
`



const element = document.getElementById('modal')

const FullLoader = ({
  isOpen = false,
}) => (
    ReactDOM.createPortal(
      <Modal isOpen={isOpen} >
        <ImageWrapper src={require('img/svg/loader.svg')} />
      </Modal>
      , element,
    )

  )

export default FullLoader
