import React from 'react'
import '../../styles/compontents/nav.scss'

export default function Header() {
  return (
    <div className="header">
      <img src={require('../../assets/images/logo/ubox.svg').default} alt="ubox" className="logo" />
      <nav className="links">
        <button>
          <img src={require('../../assets/images/upload.svg').default} alt="*" />
        </button>
        <a href="#">Second tab</a>
      </nav>
    </div>
  )
}
