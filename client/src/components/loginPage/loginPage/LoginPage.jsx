import React from 'react';
import "../loginPage/LoginPage.scss";
import logo from "../../../assets/logo.png";
import LoginForm from '../loginForm/LoginForm';

/**
 * The LoginPage component displays the login page UI.
 * 
 * @returns The login page UI.
 */
const LoginPage = () => {
  return (
    <div className='login-container'>
        <div className='header'>
            <img src = {logo} alt="" />
            <span>Recipe Book</span>
        </div>
        <div className='form-container'>
            <span>Welcome to Recipe Book, where you can find delicious recipes!</span>
            <LoginForm />
        </div>
    </div>
  )
}

export default LoginPage;