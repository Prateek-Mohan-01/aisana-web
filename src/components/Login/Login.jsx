import React, { useState } from 'react'
import Logo from '../../assets/logo-1.png'
import { MdMailOutline } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';
import LoginCarousel from './LoginCarousel';

const Login = () => {
    const [passIcon, setPassIcon] = useState(true);
    const navigate   = useNavigate();
    
    const handleLogin = (e) => {
        e.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let data = { 'Email' : email, 'Password' : password, 'isLoggedIn' : true }
        sessionStorage.setItem('UserData', JSON.stringify(data))
        navigate('/admin/home');
    }
    
    return (
        <div className="container-fluid px-0">
            <div className="row m-0">
                <div className="col-lg-6 px-0">
                    <div className="login-left-block px-4">
                        <div className="py-4">
                            <a href="#"><img src= {Logo}  alt="Aisana Solutions" className="logo" /></a>
                        </div>
                        <div className="py-4 d-none d-sm-none d-md-none d-lg-block">
                            <div className="row justify-content-center">
                                <LoginCarousel />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 px-0">
                    <div className="login-right-block">
                        <div className="login-inner-block">
                            <div className="d-flex align-items-center justify-content-center">
                               <h1 className='logo-text'>Welcome to Aisana Solutions</h1>                    
                            </div>
                            <div className="d-block">
                                <form >
                                    <div className="mb-4">
                                        <div className="input-block">
                                            <span className="icon"><MdMailOutline /></span>
                                            <input type="text" name="email" id="email" className="input-field" placeholder='Email' defaultValue="aisana@admin.com" readOnly/>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="input-block">
                                            <span className="icon"><FaLock /></span>
                                            <input type={ passIcon ? "password" : "text" } name="password" id="password" className="input-field" placeholder='Password' defaultValue="aisana@123" readOnly/>
                                            <span className="icon" onClick={() => { setPassIcon((prev) => !prev)}}>
                                                { passIcon ? <FaEyeSlash /> : <FaEye /> }
                                            
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="custom-container">
                                            <div className="d-flex align-items-center">
                                                <input type="checkbox" name="remember" id="remember" className="input-check" defaultChecked = "checked"/>
                                                <span className="ms-2 d-block rememwrd">Remember Me</span>
                                            </div>
                                            <a href="#" className='fgrtpwsd'>Forgot Password</a>
                                        </div>
                                    
                                    </div>
                                    <div className="mb-4">
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-login" onClick ={(e) => handleLogin(e)}>Login</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login