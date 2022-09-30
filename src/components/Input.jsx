import React from 'react'
import PropTypes from 'prop-types'
import './Input.css'

const Input = ({
  children,
  type = "text",
  name,
  value,
  className,
  variant = "primary",
  defaultValue,
  placeHolder,
  autoComplete,
  required,
  isFocused,
  handleChange,
  isError,

}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      className={`w-full text-base input-${variant} font-normal px-3 py-1.5 border border-solid ${isError && "input-error"} rounded m-0 placeholder=${placeHolder} autocomplete=${autoComplete} ${className}`}
      autoComplete={autoComplete}
      required={required}
      onChange={(e) => handleChange(e)}
      placeholder={placeHolder}
      defaultValue={defaultValue}
    />
  )
}

export default Input

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'email', 'password', 'file']),
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'error', 'primary-outline']),
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
  isFocused: PropTypes.bool,
  handleChange: PropTypes.func,
  isError: PropTypes.bool,
}