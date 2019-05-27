import React, { useState, useEffect } from 'react'

export const matchTrue = inputObj =>
  Object.keys(inputObj).reduce((acc, key) => {
    const ras = inputObj[key] && acc
    return ras
  }, true)

const FormValidation = props => {
  const [validation, setValidation] = useState(props.initialValidation)
  const [validationParams] = useState(props.validationParams)
  const [data, setData] = useState(props.intialData)

  const onChange = ({ target }) => {
    setValidation(val => {
      val[target.name] = validationParams[target.name].test(target.value)
      return val
    })
    setData(dat => {
      dat[target.name] = target.value
      // console.log(dat)
      return dat
    })
    props.updateParent()
  }

  const onSubmit = () => {
    const newValidation = {}
    Object.keys(validationParams).forEach(key => {
      newValidation[key] = data[key]
        ? validationParams[key].test(data[key])
        : false
    })
    setValidation({ ...newValidation })
    if (matchTrue(newValidation)) {
      props.submitToparent({ type: 'valid', data })
    } else {
      const invalidData = Object.keys(validation).reduce((acc, key) => {
        if (!validation[key]) {
          acc.push(key)
        }
        return acc
      }, [])
      props.submitToparent({ type: 'invalid', data: invalidData })
    }
  }

  return (
    <React.Fragment>
      {props.children({ data, validation }, { onChange, onSubmit })}
    </React.Fragment>
  )
}


FormValidation.defaultProps = {
  initialValidation: {},
  intialData: {},
  updateParent: () => { },
  validationParams: {},
  submitToparent: data => {
    console.log(data)
  },
  children: undefined
}

export default FormValidation
