import React, { useState } from 'react';
import './Login.css';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../actions/index';

function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const error = useSelector((state) => state.login.error);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (user !== '') {
    window.location.href = '/Home';
    localStorage.setItem('Email', email);
    
  }


  const LoginFun = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const goRegister = ()=>{
    window.location.href = '/register';
  }

  return (
    <>
      <div id='landing' style={{ height: '99.5vh' }}>
        <h1 id='head' style={{ padding: '8vw' }}>
          The Finance Steps
        </h1>
        <p style={{ visibility: 'hidden', height: '13vh' }}></p>
        <form>
          <div className='form-item'>
            <label htmlFor='email'></label>
            <input
              style={{ width: '50vw' }}
              type='email'
              name='email'
              required='required'
              placeholder='Email Address'
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className='form-item'>
            <label htmlFor='password'></label>
            <input
              style={{ width: '50vw' }}
              type='password'
              name='password'
              required='required'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div id='Error-div'>
            <span>{error}</span>
          </div>
          <div className='button-panel'>
            <input
              type='submit'
              className='button'
              title='LogIn'
              value='Login'
              onClick={(e) => LoginFun(e)}
            ></input>
          </div>
        </form>
        <div className='form-footer'></div>
        <p className='goReg' onClick={goRegister}>Not a user ? ={">"} Register</p>
      </div>
    </>
  ); 
}

export default Login;