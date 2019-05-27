import React from 'react'
import { Wrapper } from 'atoms'
// import styled from 'styled-components'
import { colors, shadows } from '@pomona/pomona3-ui/lib/constants'
import { SystemIcons } from '@pomona/pomona3-ui/lib/atoms'

const NotifBell = ({ isActive, margin, onClick }) => ( 
  <Wrapper onClick={onClick} cursor="pointer">
    {
      isActive ? <SystemIcons margin={margin} onClick={onClick} name="notificationActive" /> : <SystemIcons name="notification" onClick={onClick} />
    }
  </Wrapper>
)
export default NotifBell
