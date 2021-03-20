import React, { useState } from 'react';
// import { signIn } from '../../redux/auth/auth.actions';

//components
import InputField from '../../components/auth/input';
import AuthSubmit from '../../components/auth/submit';
import Logo from '../../components/auth/logo';
import AuthMessage from '../../components/auth/message';

export default function Login() {
  const [payload, setPayload] = useState({ email: '', password: '', confirmPassword: '', name: '' });
  const [loginError, setLoginError] = useState({ status: false, msg: '' });


  const handleChange = (key, value) => {
    let np = payload;
    np[key] = value;
    setPayload(np)
  }


  const submitForm = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, name } = payload;
    payload.avatar = `http://gravatar.com/avatar?d=identicon`;
    if (!email || !password || !confirmPassword || !name) {
      setLoginError({ status: true, msg: 'Please fill all the fields' })
    }
    // signIn(payload);
  }

  return (
    <div className="auth-container">
      <Logo />
      <div className="auth-form">
        {loginError.status
          ? <AuthMessage type="error">
            {loginError.msg ? loginError.msg : 'Some error Occured'}
          </AuthMessage>
          : ''
        }
        <h3 className="auth-form-title">Get started</h3>
        <form onSubmit={submitForm}>
          <div className="inputs-cover">
            <InputField placeholder="Username" type="text" value={payload.email}
              onChange={e => handleChange("email", e.target.value)} />

            <InputField placeholder="Full name" type="text" value={payload.name}
              onChange={e => handleChange("name", e.target.value)} />

            <InputField withIcon placeholder="Password" type="password" value={payload.password}
              onChange={e => handleChange("password", e.target.value)} />

            <InputField withIcon noBorderBotom placeholder="Confirm password" type="password" value={payload.confirmPassword}
              onChange={e => handleChange("confirmPassword", e.target.value)} />
          </div>
          <AuthSubmit label="Register" handleClick={submitForm} />
        </form>
        <div className="copyright">2021 ubox. All Rights Reserved </div>
      </div>
    </div>
  )
}