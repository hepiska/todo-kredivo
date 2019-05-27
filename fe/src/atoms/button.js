import React, { Component } from 'react'
import styled from 'styled-components'
import { colors } from 'utils/constants'

const ButtonContainer = styled.button`
  cursor: pointer;
  display: flex;
  border: none;
  margin: ${({ dmargin, margin }) => dmargin || margin || null};
  padding: ${({ dpadding, padding }) => dpadding || padding || null};
  font-family: ${({ fontFamily }) => fontFamily || 'Linotte'};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: ${({ width }) => {
    switch (width) {
      case 'tiny':
        return '80px'
      case 'small':
        return '64px'
      case 'big':
        return '296px'
      case 'huge':
        return '328px'
      case 'full':
        return '100%'
      case 'content':
        return 'null'
      default:
        return '144px'
    }
  }};
  height: ${({ width }) => {
    switch (width) {
      case 'tiny':
        return '24px'
      case 'small':
        return '32px'
      case 'big':
        return '40px'
      case 'huge':
        return '40px'
      case 'content':
        return null
      default:
        return '40px'
    }
  }};
  border-radius: 8px;
  color: ${({ color }) => color || colors.white};
  background-color: ${({ background }) => background || colors.pomonaBlue};
  line-height: ${({ lineHeight }) => lineHeight || '1'};
  font-weight: 500;
  :hover {
    filter: brightness(0.8);
  }
  :focus {
    outline: none;
  }
  @media screen and (max-width: 768px) {
    padding: ${({ padding }) => padding || null};
    margin: ${({ margin }) => margin || null};
  }
`

const OutlineButtonCountainer = styled(ButtonContainer)`
  color: ${({ color }) => color || colors.pomonaBlue};
  border: 1px solid;
  border-color: ${({ color }) => color || colors.pomonaBlue};
  background-color: ${colors.white};
`
const PlainButtonCountainer = styled(ButtonContainer)`
  color: ${({ color }) => color || colors.pomonaBlue};
  border: none;
  background-color: ${colors.white};
  box-shadow: ${({ shadow }) => shadow || null};
`

const InnerContainer = styled.div`
  display: flex;
  justify-content: ${({ justify }) => justify || 'center'};
  align-items: ${({ align }) => align || 'center'};
  flex: ${({ flex }) => flex || 1};
  height: 100%;
  font-size: 14px;
`

const FloatingButtonWrapper = styled.div.attrs({
  postition: 'fixed',
  left: props => props.x || '10%',
  top: props => props.y || '95%'
})`
  position: fixed;
  display: flex;
  left: ${({ x }) => x};
  top: ${({ y }) => y};
  width: ${({ size }) => size || '56px'};
  height: ${({ size }) => size || '56px'};
  border-radius: ${({ size }) => size / 2 || '28px'};
  background: ${({ background }) => background || colors.pomonaBlue};
  z-index: 100000;
`

const current = {
  x: 0,
  y: 0
}

const newPos = {
  x: 0,
  y: 0
}

const Icon = props => (
  <InnerContainer id={`${props.id}-icon`} flex={1}>
    {props.children}
  </InnerContainer>
)

Icon.defaultProps = {
  id: undefined
}

const Button = ({
  size,
  background,
  onClick,
  icon,
  children,
  color,
  id,
  fontFamily,
  margin,
  padding,
  dmargin,
  dpadding,
  lineHeight
}) =>
  (
    <ButtonContainer
      padding={padding}
      margin={margin}
      dpadding={dpadding}
      dmargin={dmargin}
      fontFamily={fontFamily}
      id={id}
      background={background}
      onClick={onClick}
      width={size}
      color={color}
    >
      {icon && <Icon id={id}>{icon}</Icon>}
      <InnerContainer
        id={`${id}-text`}
        flex={2}
        justify={icon && 'flex-start'}
        lineHeight={lineHeight}
      >
        {children}
      </InnerContainer>
    </ButtonContainer>
  )


export const PlainButton = ({
  size,
  onClick,
  icon,
  children,
  color,
  id,
  fontFamily,
  margin,
  padding,
  dmargin,
  dpadding,
  shadow,
  lineHeight
}) =>
  (
    <PlainButtonCountainer
      padding={padding}
      margin={margin}
      dpadding={dpadding}
      dmargin={dmargin}
      fontFamily={fontFamily}
      id={`${id}`}
      onClick={onClick}
      width={size}
      color={color}
      shadow={shadow}
    >
      {icon && (
        <InnerContainer id={`${id}-icon`} flex={1}>
          {icon}
        </InnerContainer>
      )}
      <InnerContainer
        flex={2}
        id={`${id}-text`}
        justify={icon && 'flex-start'}
        lineHeight={lineHeight}
      >
        {children}
      </InnerContainer>
    </PlainButtonCountainer>
  )





export const OutlineButton = ({
  size,
  onClick,
  icon,
  children,
  color,
  id,
  fontFamily,
  margin,
  padding,
  dmargin,
  dpadding,
  lineHeight
}) =>
  (
    <OutlineButtonCountainer
      padding={padding}
      margin={margin}
      dpadding={dpadding}
      dmargin={dmargin}
      fontFamily={fontFamily}
      id={`${id}`}
      onClick={onClick}
      width={size}
      color={color}
    >
      {icon && (
        <InnerContainer id={`${id}-icon`} flex={1}>
          {icon}
        </InnerContainer>
      )}
      <InnerContainer
        flex={2}
        id={`${id}-text`}
        justify={icon && 'flex-start'}
        lineHeight={lineHeight}
      >
        {children}
      </InnerContainer>
    </OutlineButtonCountainer>
  )

OutlineButton.defaultProps = {
  size: 'medium',
  color: colors.pomonaBlue,
  fontFamily: 'Linotte',
  padding: null,
  margin: null,
  dpadding: null,
  dmargin: null,
  onClick: () => { },
  icon: undefined,
  id: undefined,
  lineHeight: undefined
}



export class FloatingButton extends Component {
  state = {
    x: '80%',
    y: '85%'
  }

  onDrop = e => {
    e.preventDefault()
    if (
      navigator.userAgent.indexOf('Safari') !== -1 &&
      navigator.userAgent.indexOf('Chrome') === -1
    ) {
      this.setState({
        x: `${current.x - e.target.offsetWidth / 2}px`,
        y: `${current.y - e.target.offsetHeight / 2}px`
      })
    } else {
      this.setState({
        x: `${e.clientX - e.target.offsetWidth / 2}px`,
        y: `${e.clientY - e.target.offsetHeight / 2}px`
      })
    }
  }

  onDrag = e => {
    e.preventDefault()
    newPos.x = current.x - e.clientX
    newPos.y = current.y - e.clientY
    current.x = e.clientX
    current.y = e.clientY
  }

  onTouchMove = e => {
    newPos.x = e.touches[0].clientX
    newPos.y = e.touches[0].clientY
    current.x = e.touches[0].clientX
    current.y = e.touches[0].clientY

    this.setState({
      x: `${newPos.x - e.target.offsetWidth / 2}px`,
      y: `${newPos.y - e.target.offsetHeight / 2}px`
    })
  }

  render() {
    const { background, size, onClick } = this.props
    return (
      <FloatingButtonWrapper
        draggable
        onDragEnd={this.onDrop}
        onDrag={this.onDrag}
        onTouchMove={this.onTouchMove}
        x={this.state.x}
        y={this.state.y}
        background={background}
        size={size}
        onClick={onClick}
      >
        {this.props.children}
      </FloatingButtonWrapper>
    )
  }
}

FloatingButton.defaultProps = {
  children: null,
  background: colors.pomonaBlue,
  size: '56px',
  onClick: () => { }
}

export default Button
