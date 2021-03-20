import React from 'react';
import '../../styles/compontents/button.scss';

export default function AuthSubmit({ label, initialized, disabled, handleClick }) {
  return (
    <button
      type="submit"
      onClick={handleClick}
      disabled={initialized || disabled ? true : false}
      className="auth-form-submit">
      {label}
      <span className={initialized ? "loader" : 'hide'}></span>
    </button>
  )
}
