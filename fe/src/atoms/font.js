import React from 'react'
import styled from 'styled-components'
import { colors } from 'utils/constants'

const FontWrapper = styled.p`
  margin: ${({ dmargin, margin }) => dmargin || margin || null};
  padding: ${({ dpadding, padding }) => dpadding || padding || null};
  letter-spacing: ${({ letterSpacing }) => letterSpacing || null};
  font-family: ${({ fontFamily }) => fontFamily || 'Linotte'};
  font-size: ${({ sizeType, size }) => {
    if (size) {
      return size
    } else if (sizeType === 'title' || sizeType === 'h1') {
      return '16px'
    } else if (sizeType === 'h2' || sizeType === 'body') {
      return '14px'
    } else {
      return '13px'
    }
  }};
  font-weight: ${({ weight, weightType }) => {
    if (weight) {
      return weight
    } else if (weightType === 'semibold') {
      return '500'
    } else if (weightType === 'light') {
      return '300'
    } else {
      return '400'
    }
  }};
  color: ${({ color }) => color || colors.primaryText};
  line-height: ${({ lineHeight }) => lineHeight || '1.2'};
  text-align: ${({ textAlign }) => textAlign || 'left'};
  @media screen and (max-width: 768px) {
    padding: ${({ padding }) => padding || null};
    margin: ${({ margin }) => margin || null};
  }
  @media (min-width: 768px) {
    font-size: ${({ sizeType, size }) => {
    if (size) {
      return size
    } else if (sizeType === 'title' || sizeType === 'h1') {
      return '20px'
    } else if (sizeType === 'h2' || sizeType === 'body') {
      return '18px'
    } else {
      return '17px'
    }
  }};
  }
`
const H1Wrapper = styled.h1`
  margin: ${({ dmargin, margin }) => dmargin || margin || null};
  letter-spacing: ${({ letterSpacing }) => letterSpacing || null};
  padding: ${({ dpadding, padding }) => dpadding || padding || null};
  font-family: ${({ fontFamily }) => fontFamily || 'Linotte'};
  font-size: ${({ sizeType, size }) => {
    if (size) {
      return size
    } else if (sizeType === 'title' || sizeType === 'h1') {
      return '16px'
    } else if (sizeType === 'h2' || sizeType === 'body') {
      return '14px'
    } else {
      return '13px'
    }
  }};
  font-weight: ${({ weight, weightType }) => {
    if (weight) {
      return weight
    } else if (weightType === 'semibold') {
      return '500'
    } else if (weightType === 'light') {
      return '300'
    } else {
      return '400'
    }
  }};
  color: ${({ color }) => color || colors.primaryText};
  line-height: ${({ lineHeight }) => lineHeight || '1.2'};
  text-align: ${({ textAlign }) => textAlign || 'left'};
  @media screen and (max-width: 768px) {
    padding: ${({ padding }) => padding || null};
    margin: ${({ margin }) => margin || null};
  }
  @media (min-width: 768px) {
    font-size: ${({ sizeType, size }) => {
    if (size) {
      return size
    } else if (sizeType === 'title' || sizeType === 'h1') {
      return '20px'
    } else if (sizeType === 'h2' || sizeType === 'body') {
      return '18px'
    } else {
      return '17px'
    }
  }};
  }
`

const H2Wrapper = styled.h2`
  margin: ${({ dmargin, margin }) => dmargin || margin || null};
  padding: ${({ dpadding, padding }) => dpadding || padding || null};
  letter-spacing: ${({ letterSpacing }) => letterSpacing || null};
  font-family: ${({ fontFamily }) => fontFamily || 'Linotte'};
  font-size: ${({ sizeType, size }) => {
    if (size) {
      return size
    } else if (sizeType === 'title' || sizeType === 'h1') {
      return '16px'
    } else if (sizeType === 'h2' || sizeType === 'body') {
      return '14px'
    } else {
      return '13px'
    }
  }};
  font-weight: ${({ weight, weightType }) => {
    if (weight) {
      return weight
    } else if (weightType === 'semibold') {
      return '500'
    } else if (weightType === 'light') {
      return '300'
    } else {
      return '400'
    }
  }};
  color: ${({ color }) => color || colors.primaryText};
  line-height: ${({ lineHeight }) => lineHeight || '1.2'};
  text-align: ${({ textAlign }) => textAlign || 'left'};
  @media screen and (max-width: 768px) {
    padding: ${({ padding }) => padding || null};
    margin: ${({ margin }) => margin || null};
  }
  @media (min-width: 768px) {
    font-size: ${({ sizeType, size }) => {
    if (size) {
      return size
    } else if (sizeType === 'title' || sizeType === 'h1') {
      return '20px'
    } else if (sizeType === 'h2' || sizeType === 'body') {
      return '18px'
    } else {
      return '17px'
    }
  }};
  }
`

const Font = ({
  type,
  children,
  weight,
  weightType,
  sizeType,
  size,
  fontFamily,
  color,
  margin,
  dMargin,
  dPadding,
  textAlign,
  lineHeight,
  letterSpacing
}) => {
  switch (type) {
    case 'h1':
      return (
        <H1Wrapper
          dmargin={dMargin}
          dpadding={dPadding}
          fontFamily={fontFamily}
          weight={weight}
          weightType={weightType}
          sizeType={sizeType}
          size={size}
          color={color}
          margin={margin}
          letterSpacing={letterSpacing}
          textAlign={textAlign}
          lineHeight={lineHeight}
        >
          {children}
        </H1Wrapper>
      )
    case 'h2':
      return (
        <H2Wrapper
          fontFamily={fontFamily}
          dmargin={dMargin}
          dpadding={dPadding}
          weight={weight}
          weightType={weightType}
          sizeType={sizeType}
          letterSpacing={letterSpacing}
          size={size}
          color={color}
          margin={margin}
          textAlign={textAlign}
          lineHeight={lineHeight}
        >
          {children}
        </H2Wrapper>
      )

    default:
      return (
        <FontWrapper
          fontFamily={fontFamily}
          dmargin={dMargin}
          dpadding={dPadding}
          weight={weight}
          weightType={weightType}
          sizeType={sizeType}
          size={size}
          color={color}
          margin={margin}
          textAlign={textAlign}
          letterSpacing={letterSpacing}
          lineHeight={lineHeight}
        >
          {children}
        </FontWrapper>
      )
  }
}

Font.defaultProps = {
  fontFamily: undefined,
  weight: undefined,
  size: undefined,
  dMargin: undefined,
  dPadding: undefined,
  sizeType: undefined,
  letterSpacing: undefined,
  margin: undefined,
  weightType: 'regular',
  color: colors.primaryText,
  type: 'p',
  textAlign: 'left',
  lineHeight: '1.2'
}


export default Font
