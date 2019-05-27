import React, { useState } from 'react'
import { Wrapper, ImageWrapper, PlainLink } from 'atoms'
import Font from 'atoms/font'
import Fields from 'atoms/field'
import Button from 'atoms/button'
import FormValidation from 'molecules/formValidation'
import Loaders from 'react-loader-spinner'
import { shadows, colors } from 'utils/constants'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { LOGIN } from 'modules/auth'
import { services } from 'utils/services'

const LoginPage = props => {
  const [childChange, setChildChange] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  const onSubmitForm = async (data) => {
    if (data.type === 'valid') {
      setFetching(true)
      setErrorMessage(false)
      try {
        const res = await services.post('/auth/login', data.data)
        setFetching(false)
        props.LOGIN(res.data.data)
        props.history.push('/')
      } catch (err) {
        setErrorMessage(err.response.data.data.message)
        setFetching(false)
      }
    }
  }

  return (
    <Wrapper direction='row' width='100%' margin='80px 0px'>
      <Wrapper shadow={shadows.idle} maxWidth='480px' padding='16px' width='100%'>
        <Font size='40px' color={colors.thisBlue} margin='16px 0px'> Login  </Font>
        <FormValidation
          intialData={{
            email: '',
            password: ''
          }}
          submitToparent={onSubmitForm}
          updateParent={() => setChildChange(!childChange)}
          validationParams={{
            email: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            password: /(.|\s)*\S(.|\s)*/,
          }}
          initialValidation={{
            email: true,
            password: true
          }}
        >
          {({ data, validation }, { onChange, onSubmit }) => (
            <div style={{ width: '100%' }}>
              <Fields
                name='email'
                label='email'
                inputPadding='13px 16px 13px 36px'
                value={data.email}
                onChange={onChange}
                placeholder='Email or Username'
                error={!validation.email && '* invalid username'}
                margin='16px 0px'
              />
              <Fields
                name='password'
                inputPadding='13px 48px 13px 36px'
                value={data.password}
                label='password'
                margin='16px 0px'
                onChange={onChange}
                placeholder='Password'
                error={!validation.password && '* invalid password'}
              />
              {errorMessage && <Font color={colors.redError}> {errorMessage} </Font>}
              <Wrapper width='100%' direction='row' justify='flex-end' align='center' margin='16px 0 0'>
                {fetching ? <Loaders type="Bars" color={colors.thisBlue} height={60} width={80} /> :
                  (
                    <Button
                      background={colors.thisBlue}
                      onClick={onSubmit}
                    >
                      Log In
                    </Button>
                  )}
              </Wrapper>
            </div>
          )}
        </FormValidation >
      </Wrapper>
    </Wrapper>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      LOGIN,
    },
    dispatch,
  )

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)