import './Authentication.css';
import './Login.css';

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';

import axios from 'axios';

import Cookies from 'js-cookie';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (emailInput && passwordInput) {
      axios
        .post(`${import.meta.env.VITE_REACT_API_URL}/login`, {
          email: emailInput,
          password: passwordInput,
        })
        .then((res) => {
          Cookies.set('token', res.data.token, { expires: 7, secure: true });
          axios.get(`${import.meta.env.VITE_REACT_API_URL}/users/me`, {
            headers: {
              'Authorization': `Bearer ${res.data.token}`
            }
          }).then((res) => {
            dispatch(login(res.data));
          })
          navigate('/');
        })
    }
  };

  const handleInputChange = (e) => {
    if (e.target.id === 'email') {
      setEmailInput(e.target.value);
    } else if (e.target.id === 'password') {
      setPasswordInput(e.target.value);
    }
  };

  return (
    <form className='authentication-form' onSubmit={handleLogin}>
      <h1 className='authentication-title'>Login</h1>
      <label htmlFor='email'>Email</label>
      <input
        id='email'
        type='email'
        value={emailInput}
        onChange={handleInputChange}
      />
      <label htmlFor='password'>Password</label>
      <input
        id='password'
        type='password'
        value={passwordInput}
        onChange={handleInputChange}
      />
      <Link className='forgot-password' to='/password/forgot'>
        Forgot Password?
      </Link>
      <button className='authentication-button'>LOGIN</button>
      <span className='new-user'>
        Not registered? <Link to='/register'>Create an account</Link>
      </span>
    </form>
  );
}

export default Login;
