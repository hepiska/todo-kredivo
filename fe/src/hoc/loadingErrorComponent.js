import React from 'react'
import { Wrapper } from 'atoms'
import Font from '@pomona/pomona3-ui/lib/atoms/fonts'
import Loader from 'molecules/loaders/circle'
import BasicModal from 'molecules/modal'



const LoadingErrorComponent = (props) => {
  const ErrorModal = () => (
    <BasicModal isOpen={props.error} title="Error" actions={[{ text: 'close', onClick: props.closeError }]}>
      <Font sizeType="h1" weightType="semibold">
        {props.error}
      </Font>
    </BasicModal>
  )
  if (props.loading) {
    return (
      <Wrapper width='100%'>
        <Loader />
      </Wrapper>
    )
  }
  return (
    <Wrapper width='100%'>
      <ErrorModal />
      {props.children}
    </Wrapper>
  )
}

export default LoadingErrorComponent