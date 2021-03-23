import React from 'react';
import '../../styles/compontents/button.scss';

export default function Submit({ label, initialized, disabled, handleClick }) {
  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={initialized || disabled ? true : false}
      className="auth-form-submit">
      {label}
      <span className={initialized ? "loader" : 'hide'}></span>
    </button>
  )
}
