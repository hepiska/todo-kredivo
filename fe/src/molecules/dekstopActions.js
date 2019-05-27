import React from 'react'
import { Wrapper, ImageWrapper } from 'atoms'
import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Button, { } from '@pomona/pomona3-ui/lib/atoms/buttons'
import Font from '@pomona/pomona3-ui/lib/atoms/fonts'
import { colors } from '@pomona/pomona3-ui/lib/constants'
import NotifBell from 'molecules/notifBell'
import Modal from 'molecules/modal'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { LOGIN } from 'modules/auth'
import { GetNotification } from 'graphQuery/notification'
import { getProfile } from 'graphQuery/user'
import CashbackInfo from 'molecules/cashbackInfo'
import Tooltip from "molecules/tooltip"



const UserCardData = graphql(getProfile, {
  options: {
    fetchPolicy: 'no-cache'
  }
})((props) => {
  const { GetProfile } = props.data
  const { profile, _id } = GetProfile || {}
  return (
    <Wrapper padding='0px 0px 0px 16px' cursor='pointer'>
      <ImageWrapper
        radius='20px'
        width='40px'
        height='40px'
        src={profile && profile.image ? profile.image : require('img/svg/group-2.svg')}
        onClick={() => props.history.push('/profile')}
      />
    </Wrapper>
  )
})



class DekstopActions extends React.Component {
  state = {
    isAuth: false,
    response: {
      title: '',
      isModalOpen: false,
      message: 'sasasasa',
    },
  }



  static getDerivedStateFromProps(props, state) {
    if (props.isAuth !== state.isAuth) {
      return {
        isAuth: props.isAuth,
      }
    }
    return null
  }
  componentDidMount() {
    if (this.state.isAuth) {
      this.props.client
        .query({
          query: GetNotification,
          fetchPolicy: 'no-cache',
        })
        .then((res) => {
          const { GetUserNotification } = res.data
          const notif = {}
          notif.receipt = GetUserNotification && GetUserNotification.notifications.filter(notifi => notifi.isRead === false)
            .filter(notifi => (notifi.data && notifi.data.actionType === 'receipt'))
          notif.unread = GetUserNotification.unreadNotification
          this.setState({ userNotif: { ...notif } })
        })
    }
  }

  onDropAccepted = (acept) => {
    this.props.history.push('/submit-receipt', { images: acept })

  }

  onDropRejected = () => {
    const NewError = {
      isModalOpen: true,
      message: 'format gambar tidak sesuai',
    }
    this.setState({
      error: NewError
    })
  }

  responseModal() {
    return (
      <Modal isOpen={this.state.response.isModalOpen} title={this.state.response.title} actions={[{ text: 'close', onClick: this.closeResponseModal }]}>
        <Font sizeType="h1" weightType="semibold">
          {this.state.response.message}
        </Font>
      </Modal>
    )
  }

  render() {
    return (
      <Wrapper direction='row' >
        {
          this.state.isAuth &&
          <Wrapper min-width='240px' overflow='hidden' margin='0px 30px 0px 0px' border={`1px solid ${colors.pomonaBlue} `}>
            <CashbackInfo history={this.props.history} />
          </Wrapper>
        }
        <Wrapper padding='0px 16px 0px 0px' position='relative'>
          {
            this.state.isAuth ?
              <Dropzone
                onDropAccepted={this.onDropAccepted}
                onDropRejected={this.onDropRejected}
                accept="image/jpeg"
                style={{ position: 'relative' }}
              >
                <Button
                  icon={
                    <ImageWrapper src={require('img/svg/ic-camera.svg')} />
                  }
                  size='medium'
                  background={colors.pomonaOrange}
                >Upload Struk
                </Button>
              </Dropzone> :
              <Button
                icon={
                  <ImageWrapper src={require('img/svg/ic-camera.svg')} />
                }
                size='medium'
                background={colors.pomonaOrange}
                onClick={() => this.props.history.push('/masuk')}
              >
                Upload Struk
              </Button>
          }
          <Tooltip type='desktop' />
        </Wrapper>


        {
          this.state.isAuth &&
          <Wrapper
            padding='0px 16px'
          >
            <NotifBell
              isActive={this.state.userNotif && this.state.userNotif.unread > 0}
              onClick={() => this.props.history.push('/notification-history')}
            />
          </Wrapper>
        }



        <UserCardData history={this.props.history} />
        {this.responseModal()}
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  LOGIN,
}, dispatch)

export default compose(
  withApollo,
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )

)(DekstopActions)