import React, {useState} from 'react';
// import { Link } from 'react-router-dom';
import { login } from '../../actions/auth';
import { useDispatch } from 'react-redux';

//components
import Input from '../../components/auth/input';
import Submit from '../../components/auth/submit';
import Logo from '../../components/auth/logo';
import Message from '../../components/auth/message';

export default function Login(props) {
  const dispatch = useDispatch()
  const [payload, setPayload] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState({ status: false, msg: '' });


  const handleChange = (key, value) => {
    setPayload(payload => ({...payload, [key]: value}))
  }



  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password} = payload;
    if (!email || !password) {
      return setLoginError({ status: true, msg: 'Please fill all the fields' })
    }
    setLoginError({ status: false, msg: '' })
    dispatch(login(payload, props));
  }

  return (
    <div className="auth-container">
      <Logo />
      <div className="auth-form">
        {loginError.status
          ? <Message type="error">
            {loginError.msg ? loginError.msg : 'Some error Occured'}
          </Message>
          : ''
        }
        <h3 className="auth-form-title">Enter your details</h3>
        <form onSubmit={onSubmit}>
          <div className="inputs-cover">
            <Input placeholder="Username" type="text" value={payload.email}
              onChange={e => handleChange("email", e.target.value)} />

            <Input withIcon noBorderBotom placeholder="Password" type="password" value={payload.password}
              onChange={e => handleChange("password", e.target.value)} />
          </div>
          {/* <div className="check-terms">
            <Link to="/reset-password-init">Forgot password?</Link>
          </div> */}
          <Submit label="Log in" handleClick={onSubmit} />
        </form>
        <div className="copyright">2021 ubox. All Rights Reserved </div>
      </div>
    </div>
  )
}