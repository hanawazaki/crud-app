import React from 'react'
import './Button.css'
import PropTypes from 'prop-types'

const Button = ({ children, type = "submit", className = "", color = "primary", disabled = "false", onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-6 py-2.5 btn-${color} font-medium text-xs leading-tight uppercase rounded shadow-md ${className} disabled=${disabled}`}>
      {children}
    </button>
  )
}

export default Button

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning']),
  disabled: PropTypes.bool,
}