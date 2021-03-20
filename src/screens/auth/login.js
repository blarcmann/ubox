import React, {useState} from 'react';
import { Link } from 'react-router-dom';
// import { signIn } from '../../redux/auth/auth.actions';

//components
import InputField from '../../components/auth/input';
import AuthSubmit from '../../components/auth/submit';
import Logo from '../../components/auth/logo';
import AuthMessage from '../../components/auth/message';

export default function Login() {
  const [payload, setPayload] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState({ status: false, msg: '' });


  const handleChange = (key, value) => {
    let np = payload;
    np[key] = value;
    setPayload(np)
  }


  const submitForm = (e) => {
    e.preventDefault();
    const { email, password } = payload;
    if (!email || !password) {
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
        <h3 className="auth-form-title">Enter your details</h3>
        <form onSubmit={submitForm}>
          <div className="inputs-cover">
            <InputField placeholder="Username" type="text" value={payload.email}
              onChange={e => handleChange("email", e.target.value)} />

            <InputField withIcon noBorderBotom placeholder="Password" type="password" value={payload.password}
              onChange={e => handleChange("password", e.target.value)} />
          </div>
          <div className="check-terms">
            <Link to="/reset-password-init">Forgot password?</Link>
          </div>
          <AuthSubmit label="Log in" handleClick={submitForm} />
        </form>
        <div className="copyright">2021 ubox. All Rights Reserved </div>
      </div>
    </div>
  )
}