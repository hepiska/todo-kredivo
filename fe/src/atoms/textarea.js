import React from 'react'
import styled from 'styled-components'
import { colors } from 'utils/constants'

const Wrapper = styled.div`
  font-family: 'Linotte';
  width: 100%;
  box-sizing: border-box;
  min-width: ${minWidth => minWidth || '250px'};
  margin: ${({ margin, dmargin }) => dmargin || margin || null};
  padding: ${({ padding, dpadding }) => dpadding || padding || null};
  background-color: transparent;
  @media screen and (max-width: 768px) {
    padding: ${({ padding }) => padding || null};
    margin: ${({ margin }) => margin || null};
  }
`
const Label = styled.label`
  font-size: 12px;
  color: ${({ labelColor }) => labelColor || colors.primaryText};
`
const InputWrapper = styled.textarea`
  border: ${({ border }) => border || `1px solid ${colors.pbShade1}`};
  border-radius: 8px;
  padding: ${({ padding = '13px 16px' }) => padding};
  font-size: 14px;
  color: ${colors.primaryText};
  margin: 5px 0;
  width: 100%;
  box-sizing: border-box;
  text-align: ${({ textAlign }) => textAlign || 'left'};
  line-height: 1;
  rows: ${({ rows }) => rows || '5'};
  resize: ${({ resize }) => resize || 'none'};
  ${({ error }) => (error ? `border-color: ${colors.redError};` : null)};
  :disabled {
    border-color: ${colors.disableText};
    cursor: not-allowed;
  }
  ::placeholder {
    color: ${colors.disableText};
  }
  :focus {
    outline: none;
    border-color: ${({ borderFocus }) => borderFocus || colors.pomonaBlue};
    + ${Label} {
      font-weight: 600;
    }
  }
`

const SideButtonWrapper = styled.span`
  position: absolute;
  height: 100%;
  ${({ left }) => (left ? `left:0;` : `right:0;`)}
  top: 0;
  border-radius: 20px;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`
const LabelInput = styled.div`
  position: relative;
`

const TextArea = ({
  label,
  type,
  name,
  placeholder,
  disabled,
  required,
  value,
  autocomplete,
  autocapitalize,
  error,
  onChange,
  onFocus,
  onBlur,
  margin,
  dmargin,
  minWidth,
  padding,
  inputPadding,
  textAlign,
  dpadding,
  labelColor,
  sideButton,
  leftButton,
  id,
  border,
  rows,
  autocorrect,
  borderFocus
}) =>
  (
    <Wrapper
      margin={margin}
      dmargin={dmargin}
      minWidth={minWidth}
      padding={padding}
      dpadding={dpadding}
    >
      {label && <Label labelColor={labelColor}>{label}</Label>}
      <LabelInput>
        <InputWrapper
          error={error}
          rows={rows}
          disabled={disabled}
          autoComplete={autocomplete}
          autoCorrect={autocorrect}
          autoCapitalize={autocapitalize}
          type={type}
          onFocus={onFocus}
          onBlur={onBlur}
          name={name}
          textAlign={textAlign}
          placeholder={placeholder}
          value={value}
          id={id}
          required={required}
          onChange={onChange}
          border={border}
          borderFocus={borderFocus}
          padding={inputPadding}
        />
        {leftButton && <SideButtonWrapper left>{leftButton}</SideButtonWrapper>}
        {sideButton && <SideButtonWrapper>{sideButton}</SideButtonWrapper>}
      </LabelInput>
      {error && (
        <Label labelColor={colors.redError} error>
          {error}
        </Label>
      )}
    </Wrapper>
  )


TextArea.defaultProps = {
  autocomplete: 'on',
  autocorrect: 'off',
  autocapitalize: 'off',
  label: undefined,
  type: 'text',
  rows: '5',
  placeholder: 'fill the text field',
  disabled: false,
  required: false,
  minWidth: undefined,
  value: undefined,
  onBlur: undefined,
  onFocus: undefined,
  error: undefined,
  onChange: () => { },
  sideButton: undefined,
  leftButton: undefined,
  margin: undefined,
  textAlign: undefined,
  labelColor: undefined,
  dmargin: undefined,
  padding: undefined,
  inputPadding: undefined,
  id: undefined,
  dpadding: undefined,
  border: undefined,
  borderFocus: undefined
}

export default TextArea
