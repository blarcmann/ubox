import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/compontents/nav.scss'


export default function Header(props) {
  const user = JSON.parse(localStorage.getItem('auth'));
  const [show, setShow] = useState(false)

  const logout = () => {
    localStorage.setItem('auth', null);
    window.location.reload()
  }

  return (
    <div className="header">
      <div className="mobile">
        <Link to="/" className="logo-main">
          <img src={require('../../assets/images/logo/ubox.svg').default} alt="ubox" className="logo" />
        </Link>
        <button className="toggle" onClick={() => setShow(!show)}>
          <img src={require('../../assets/images/misc/hamburger.svg').default} alt="menu" className="menu" />
        </button>
        {show && user && user.userId &&
          <nav className="mobile-links">
            <img src={require('../../assets/images/misc/close.svg').default} onClick={() => setShow(!show)} alt="close" className="close-menu" />
            <Link to="/video/upload">Upload</Link>
            <Link to="/subscriptions">Subscriptions</Link>
            <button className="logout" onClick={logout} >Logout</button>
          </nav>
        }
        {show && !user &&
          <nav className="mobile-links">
            <img src={require('../../assets/images/misc/close.svg').default} onClick={() => setShow(!show)} alt="close" className="close-menu" />
            <Link to="/login">Login</Link>
          </nav>
        }
      </div>
      <div className="desktop">
        <Link to="/" className="logo-main">
          <img src={require('../../assets/images/logo/ubox.svg').default} alt="ubox" className="logo" />
        </Link>
        {user &&
          <nav className="links">
            <Link to="/video/upload">
              <img src={require('../../assets/images/misc/upload.svg').default} alt="*" />
            </Link>
            <Link to="/subscriptions">Subscriptions</Link>
            <button className="logout" onClick={logout}>Logout</button>
          </nav>
        }
        {!user &&
          <nav className="links">
            <Link to="/login">Login</Link>
          </nav>
        }
      </div>
    </div>
  )
}
