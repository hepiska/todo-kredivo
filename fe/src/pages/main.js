import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getall, editTodo, deleteTodo, addTodo } from 'modules/todo'
import { obj2qstr } from 'utils/helper'
import Fields from 'atoms/field'
import Font from 'atoms/font'
import { Wrapper, } from 'atoms'
import { authServices } from 'utils/services'
import { connect } from 'react-redux'
import TodoCard from 'molecules/todoCard'
import AddTodoModal from 'organisms/addTodoModal'
import { bindActionCreators } from 'redux'

const AbsWrapper = styled(Wrapper)`
  top:0;
  left:0;
`


const Dropdown = (props) => {
  const onChange = (e) => {
    const data = { name: props.name, value: e.target.value }
    props.onChange({ target: data })
  }
  return (
    <Wrapper direction='row' justify='flex-start'  >
      <Font margin='0px 20px 0px 0px'>{props.label}</Font>
      <select onChange={onChange} value={props.value}>
        {props.options.map(({ val, label }) => <option key={val} value={val}>{label}</option>)}
      </select>

    </Wrapper >
  )
}

const MainPage = (props) => {
  const [isListOpen, setListOpen] = useState(false)
  const [sort, setSort] = useState(1)
  const [filter, setfilter] = useState('')
  const [fetching, setFetching] = useState(false)
  const [isEndofData, setIsEndOfData] = useState(false)
  const [value, setvalue] = useState('')
  const [selectedData, setSelectedData] = useState(null)
  const [errorMessage, setErrorMessage] = useState(false)
  const [isModalOpen, setModal] = useState(false)
  let lastSkip = 0
  let lastPos = 0
  let skip = 0
  const defaultLimit = 10
  useEffect(() => {
    const params = {}
    if (value) {
      params.q = value
    }
    if (sort) {
      params.sort = sort
    }
    if (filter) {
      params.filter = filter
    }
    props.getall(params)
  }, [value, sort, filter])

  const onSearch = ({ target }) => {
    setvalue(target.value)
  }

  const fetchData = (inskip, limit) => {
    const params = {}
    if (value) {
      params.q = value
    }
    if (sort) {
      params.sort = sort
    }
    if (filter) {
      params.filter = filter
    }
    const qs = obj2qstr({ ...params, skip: inskip, limit, })
    setFetching(true)
    authServices.get(`/todo/user${qs}`).then(res => {
      if (!res.data.data.length) {
        return setIsEndOfData(true)
      }
      return props.addTodo(res.data.data)
    })
  }

  const _onScroll = (event) => {
    const currentPos = event.target.scrollTop
    const isScrollDown = currentPos - lastPos > 0

    if (isScrollDown) {
      if ((event.target.offsetHeight + event.target.scrollTop) / event.target.scrollHeight >= 0.95) {
        if (!fetching && !isEndofData) {
          const newSkip = skip + 1
          if (newSkip > lastSkip) {
            skip = newSkip
            lastSkip = newSkip
          }
          if (fetching) {
            return
          }

          fetchData(skip, defaultLimit)
          // this.fetchData(this.props.limit || defaultLimit, this.skip)
        }
      }
    }

    lastPos = currentPos
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
  const changeFilter = ({ target }) => {
    setfilter(target.value)
  }

  const changeSort = ({ target }) => {
    setSort(target.value)
  }
  const onDeleteItem = (id) => () => {
    props.deleteTodo(id)
  }

  const seteditTodo = (data) => () => {
    setSelectedData(data)
    openModal()
  }

  return (
    <Wrapper margin='85px 0px' padding='0px 33px' justify='flex-start' height="calc(100vh)" position='relative' overflow='auto' onScroll={_onScroll}>
      <AbsWrapper width='100vw' maxWidth='720px' background='white' radius='0' padding='8px'  >
        <Fields placeholder='search...' onChange={onSearch} value={value} />
        <Wrapper direction='row' justify='space-between' width='100%'>
          <Dropdown
            label='filter'
            onChange={changeFilter}
            value={filter}
            options={[{ val: 'all', label: 'all' }, { val: 'done', label: 'done' }, { val: 'undone', label: 'undone' }]}
          />
          <Dropdown
            value={sort}
            onChange={changeSort}
            label='sort'
            options={[{ val: 0, label: 'priority' }, { val: 3, label: 'date' }]}
          />
        </Wrapper>
      </AbsWrapper>
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
      <Wrapper height='120px' width='100%' />
    </Wrapper >
  )
}


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getall,
      editTodo,
      deleteTodo,
      addTodo,
    },
    dispatch,
  )

const mapStateToProps = state => ({
  todos: state.todos,
})
export default connect(mapStateToProps, mapDispatchToProps)(MainPage)