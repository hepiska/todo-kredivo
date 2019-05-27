import React from 'react'
import styled from 'styled-components'

const defaultLimit = 10

class InviniteScroll extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: false,
      isListOpen: false,
      value: '',
      skip: 0,
      lastSkip: 0,
      lastPos: 0,
      listData: [],
      //   error: {
      //     status: false,
      //     message: '',
      //   },
    }
    this.input = React.createRef()
  }

  componentWillMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  _onScroll = (event) => {
    const currentPos = event.target.scrollTop
    const isScrollDown = currentPos - this.state.lastPos > 0
    if (isScrollDown) {
      // console.log(event.target.scrollTop / ((this.state.skip + 1) * event.target.scrollHeight), event.target.scrollHeight)
      if (event.target.scrollTop / event.target.scrollHeight > 0.45) {
        if (!this.state.isFetching) {
          this.setState(
            (state) => {
              const newSkip = this.state.skip + 1
              if (newSkip > this.state.lastSkip) {
                state.skip = newSkip
                state.lastSkip = newSkip
              }
              return state
            },
            () => {
              if (this.state.isFetching) {
                return
              }
              this.fetchData(this.props.limit || defaultLimit, this.state.skip)
            },
          )
        }
      }
    }

    this.setState({
      lastPos: currentPos,
    })
  }

  fetchData = (limit = defaultLimit, skip) => {
    this.setState({ isFetching: true })
    this.props
      .fetchData(limit, skip)
      .then((data) => {
        if (!this._isMounted) return
        if (!data.length) {
          this.setState({ isFetching: false })
          return
        }
        this.setState({ listData: [...this.state.listData, ...data], isFetching: false })
      })
      .catch((err) => {
        this.setState({ isFetching: false })
      })
  }

  //  _onHover = () => {
  //    console.log('hovered')
  //  }

  render() {
    const { title, margin, top } = this.props

    return <div>sas</div>
  }
}

export default InviniteScroll
