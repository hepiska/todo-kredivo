
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getall } from 'modules/todo'
import { Wrapper, } from 'atoms'
import Font from 'atoms/font'
import Textarea from 'atoms/textarea'
import Button from 'atoms/button'
import { shadows, colors } from 'utils/constants'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FaCheck, FaRegCircle, FaCaretDown, FaRegCheckCircle } from "react-icons/fa"

const getColor = (priority) => {
  switch (priority) {
    case 1:
      return colors.redError
    case 2:
      return colors.yellowCaution
    default:
      return colors.greenApprove
  }
}


const TodoCard = (props) => {
  const [expand, setExpand] = useState(false)
  const changeExpand = () => {
    setExpand(!expand)
  }

  return (
    <Wrapper key={props.todo.id} shadow={shadows.idle} padding='16px' width='100%' margin='10px 0px' background={getColor(props.todo.priority)}>
      <Wrapper direction='row' width='100%' justify='space-between'>
        <Wrapper margin='0px 40px 0px 0px' onClick={props.changeIsDone}>
          {props.todo.isDone ? <FaRegCheckCircle /> : <FaRegCircle />}
        </Wrapper>
        <Wrapper margin='0px 20px 0px 0px' flex='1' align='flex-start'>
          <Font textAlign='start' color="black"> {props.todo.title} </Font>
        </Wrapper>
        <Wrapper width='40px' onClick={changeExpand}>
          <FaCaretDown />
        </Wrapper>
      </Wrapper>
      {expand && (
        <Wrapper width='100%' margin='20px 0px'>
          <Textarea disabeled value={props.todo.note} />
          <Wrapper width='100%' direction='row' justify='flex-end'>
            <Button size='content' padding='8px 10px' onClick={props.onDelete} background={colors.redError} margin='0px 12px'> delete  </Button>
            <Button size='content' padding='8px 10px' onClick={props.onEdit} background={colors.thisBlue}> edit  </Button>
          </Wrapper>
        </Wrapper>
      )}
    </Wrapper>
  )
}


export default TodoCard