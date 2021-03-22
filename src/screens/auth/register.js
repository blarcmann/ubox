import React, { useState } from 'react';
import {useDispatch } from 'react-redux';
import { register } from '../../actions/auth';

//components
import InputField from '../../components/auth/input';
import AuthSubmit from '../../components/auth/submit';
import Logo from '../../components/auth/logo';
import AuthMessage from '../../components/auth/message';

export default function Register(props) {
  const dispatch = useDispatch()
  const [payload, setPayload] = useState({ email: '', password: '', confirmPassword: '', name: '' });
  const [loginError, setLoginError] = useState({ status: false, msg: '' });



  const handleChange = (key, value) => {
    setPayload(payload => ({ ...payload, [key]: value }));
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, name } = payload;
    payload.avatar = `http://gravatar.com/avatar?d=identicon`;
    console.log(payload)
    if (!email || !password || !confirmPassword || !name) {
      return setLoginError({ status: true, msg: 'Please fill all the fields' })
    }
    if (password !== confirmPassword) {
      return setLoginError({ status: true, msg: 'Password does not match' })
    }
    setLoginError({ status: false, msg: '' })
    dispatch(register(payload, props));
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
        <form onSubmit={onSubmit}>
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
          <AuthSubmit label="Register" handleClick={onSubmit} />
        </form>
        <div className="copyright">2021 ubox. All Rights Reserved </div>
      </div>
    </div>
  )
}