import React from 'react'

export default function AuthMessage({children, type}) {
  return (
    <div className={type === 'error' ? "auth-form-message error slide-in" : 'auth-form-message slide-in'}>
      <p className={type === 'success' ? "content success" : 'content'}>
        {children}
      </p>
    </div>
  )
}
