import React from 'react';
import '../../styles/auth.scss';
import { withRouter } from 'react-router-dom';

export function AuthLogo(props) {
  const navigateHome = () => {
    props.history.push('/');
  }
  return (
    <div className="logo" onClick={navigateHome}>
      <img src={require('../../assets/images/logo/ubox.svg').default} alt="ubox" className="logo" />
    </div>
  )
}

export default withRouter(AuthLogo);