
import React, { useState } from 'react'
import styled from 'styled-components'
import { Wrapper } from 'atoms'
import Font from 'atoms/font'
import Fields from 'atoms/field'
import Textarea from 'atoms/textarea'
import Button from 'atoms/button'
import FormValidation from 'molecules/formValidation'
import Modal from 'molecules/modal'
import { getall, editTodo } from 'modules/todo'
import { authServices } from 'utils/services'
import { shadows, colors } from 'utils/constants'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import Loaders from 'react-loader-spinner'


const Dropdown = (props) => {
  const onChange = (e) => {
    const data = { name: props.name, value: e.target.value }
    props.onChange({ target: data })
  }
  return (
    <Wrapper direction='row' justify='flex-start'  >
      <Font margin='0px 20px 0px 0px'>{props.label}</Font>
      <select onChange={onChange} value={props.value}>
        <option value="1">high</option>
        <option value="2">medium</option>
        <option value="3">low</option>
      </select>

    </Wrapper >
  )
}

const AddTodoModal = (props) => {
  const [childChange, setChildChange] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const initialData = {
    title: '',
    note: '',
    priority: 3,
  }
  const onSubmitForm = async (data) => {
    if (data.type === 'valid') {
      setFetching(true)
      setErrorMessage(false)
      try {
        if (props.selectedData) {
          props.editTodo(props.selectedData.id, data.data)
          setFetching(false)
        } else {
          const res = await authServices.post('/todo', data.data)
          setFetching(false)
          props.getall({})
        }

        props.closeModal()
        // props.history.push('/')
      } catch (err) {
        setErrorMessage(err.response.data.data.message)
        setFetching(false)
      }
    }
  }
  return (
    <Modal
      title={props.selectedData ? 'Edit List' : 'Tambah list'}
      isOpen={props.isOpen}
    >
      <Wrapper width='100%'>
        <FormValidation
          intialData={props.selectedData || initialData}
          submitToparent={onSubmitForm}
          updateParent={() => setChildChange(!childChange)}
          validationParams={{
            title: /(\w{1,})/,
            note: /(\w)/,
            priority: /(\d)/
          }}
          initialValidation={{
            title: true,
            note: true,
            priority: true
          }}
        >
          {({ data, validation }, { onChange, onSubmit }) => (
            <div style={{ width: '100%' }}>
              <Fields
                name='title'
                label='title'
                inputPadding='13px 16px 13px 36px'
                value={data.title}
                onChange={onChange}
                placeholder='title or Username'
                error={!validation.title && '* invalid username'}
                margin='0px 0px 16'
              />
              <Textarea
                name='note'
                type=''
                inputPadding='13px 48px 13px 36px'
                value={data.note}
                label='note'
                margin='16px 0px'
                onChange={onChange}
                placeholder='note'
                error={!validation.note && '* invalid note'}
              />
              <Dropdown
                name='priority'
                type=''
                inputPadding='13px 48px 13px 36px'
                value={data.priority}
                label='priority'
                margin='16px 0px'
                onChange={onChange}
              />

              {errorMessage && <Font color={colors.redError}> {errorMessage} </Font>}
              <Wrapper width='100%' direction='row' justify='flex-end' align='center' margin='16px 0 0'>
                {fetching ? <Loaders type="Bars" color={colors.thisBlue} height={60} width={80} /> :
                  (
                    <Wrapper direction='row'>
                      <Button
                        margin='0px 16px'
                        size='content'
                        padding='8px 12px'
                        background={colors.redError}
                        onClick={props.closeModal}
                      >
                        batal
                      </Button>
                      <Button
                        size='content'
                        padding='8px 12px'
                        background={colors.thisBlue}
                        onClick={onSubmit}
                      >
                        Simpan
                      </Button>
                    </Wrapper>

                  )}
              </Wrapper>
            </div>
          )}
        </FormValidation >
      </Wrapper>
    </Modal>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getall,
      editTodo,
    },
    dispatch,
  )

export default connect(null, mapDispatchToProps)(AddTodoModal)