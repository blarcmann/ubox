import React from 'react';
import '../../styles/auth.scss';
import { withRouter } from 'react-router-dom';

export function AuthLogo(props) {
  const navigateHome = () => {
    props.history.push('/');
  }
  return (
    <div className="logo noMarginBottom" onClick={navigateHome}>
      {/* <img src={require('../../assets/svgs/verglyLogoWhite.svg')} alt="VERGLY" /> */}
      <span>uBox</span>
      {/* <img src={require('../../assets/svgs/v-tv.svg')} alt="VERGLY" style={{paddingLeft: '7px'}} /> */}
    </div>
  )
}

export default withRouter(AuthLogo);