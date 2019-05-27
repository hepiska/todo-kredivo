import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getall, editTodo, deleteTodo } from 'modules/todo'
import { Wrapper, } from 'atoms'
import { connect } from 'react-redux'
import TodoCard from 'molecules/todoCard'
import AddTodoModal from 'organisms/addTodoModal'
import { bindActionCreators } from 'redux'


const MainPage = (props) => {
  const [isListOpen, setListOpen] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [value, setvalue] = useState('')
  const [selectedData, setSelectedData] = useState(null)
  const [errorMessage, setErrorMessage] = useState(false)
  const [isModalOpen, setModal] = useState(true)
  const lastSkip = 0
  const lastPos = 0
  const skip = 0
  const defaultLimit = 10
  useEffect(() => { props.getall('') }, [])

  const _onScroll = (event) => {
    const currentPos = event.target.scrollTop
    const isScrollDown = currentPos - this.lastPos > 0

    if (isScrollDown) {
      if ((event.target.offsetHeight + event.target.scrollTop) / event.target.scrollHeight >= 0.95) {
        if (!this.state.isFetching && !this.state.isEndofData) {
          const newSkip = this.skip + 1
          if (newSkip > this.lastSkip) {
            this.skip = newSkip
            this.lastSkip = newSkip
          }
          if (this.state.isFetching) {
            return
          }

          this.fetchData(this.props.limit || defaultLimit, this.skip)
        }
      }
    }

    this.lastPos = currentPos
  }

  const closeModal = () => {
    setModal(false)
  }

  const openModal = () => {
    setModal(true)
  }

  const changeIsDone = (id, isDone) => () => {
    props.editTodo(id, { isDone: !isDone })
  }
  const onDeleteItem = (id) => () => {
    props.deleteTodo(id)
  }

  const seteditTodo = (data) => () => {
    setSelectedData(data)
    openModal()
  }

  return (
    <Wrapper margin='72px 0px' padding='0px 16px' position='relative'>
      {isModalOpen && <AddTodoModal isOpen={isModalOpen} closeModal={closeModal} selectedData={selectedData} />}

      {props.todos.map(todo =>
        (<TodoCard
          key={todo.id}
          onEdit={seteditTodo(todo)}
          todo={todo}
          changeIsDone={changeIsDone(todo.id, todo.isDone)}
          onDelete={onDeleteItem(todo.id)}
        />)
      )}
    </Wrapper >
  )
}


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getall,
      editTodo,
      deleteTodo,
    },
    dispatch,
  )

const mapStateToProps = state => ({
  todos: state.todos,
})
export default connect(mapStateToProps, mapDispatchToProps)(MainPage)