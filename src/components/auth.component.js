import React, {createRef, useEffect, useState} from "react";
import { Redirect } from 'react-router-dom';

import {Link} from "react-router-dom";
import axios from 'axios'
import * as $ from 'jquery'

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const EMAIL_REGEX_CHECK = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Auth = () => {

    const emailRef = createRef();
    const passwordRef = createRef();
    const btnRef = createRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [validEmail, setValidEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);

    const [authError, setAuthError] = useState(null)

    useEffect(() => {

        const validateForm = () => {

            /* checking for valid email  */

            if (email.length < 5) {
                $(emailRef.current).css({
                    borderBottom: `3px solid grey`,
                });
                setValidEmail(false)
            } else if (email.length > 5 && EMAIL_REGEX_CHECK.test(email)) {
                $(emailRef.current).css({
                    borderBottom: `3px solid green`,
                });
                setValidEmail(true)
            } else {
                $(emailRef.current).css({
                    borderBottom: `3px solid red`,
                });
                setValidEmail(false)
            }

            /* checking for password > 6 digits  */

            //TODO: don't forget to delete comments of password validation
            setIsPassword(true)
            // if (password.length === 0) {
            //     $(passwordRef.current).css({
            //         borderBottom: `3px solid grey`,
            //     });
            //     setIsPassword(false)
            // } else if (password.length > 6) {
            //     $(passwordRef.current).css({
            //         borderBottom: `3px solid green`,
            //     });
            //     setIsPassword(true)
            // } else {
            //     $(passwordRef.current).css({
            //         borderBottom: `3px solid red`,
            //     });
            //     setIsPassword(false)
            // }

        };

        validateForm()

    }, [email, password, validEmail, isPassword, emailRef, passwordRef]);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`${process.env.REACT_APP_API_SERVER}/auth/token/login/`, {
            username: email,
            password: password
        })
            .then( res => {
                localStorage.setItem('token', res.data.access);
                localStorage.setItem('refresh', res.data.refresh);
                window.location.href = '/'
            })
            .catch(err => setAuthError(err))
    };

    if (localStorage.getItem('token')){
        return <Redirect to={'/'} ></Redirect>
    }

    return (
        <div className="AuthComponent">
            <div className="AuthComponentWrapper">

                <form onSubmit={handleSubmit}>

                    <span>
                        Welcome
                    </span>

                    <div className="inputGroup">
                        <div className="Area user-input-wrp">
                            <br/>
                            <input
                                type="text"
                                className="inputText"
                                ref={emailRef}
                                onChange={event => setEmail(event.target.value)}
                                required
                            />
                            <span className="floating-label">Email</span>
                        </div>

                        <div className="Area user-input-wrp">
                            <br/>
                            <input
                                type="password"
                                className="inputText"
                                ref={passwordRef}
                                onChange={event => setPassword(event.target.value)}
                                required
                            />
                            <span className="floating-label">Password</span>
                        </div>


                    </div>

                    {validEmail && isPassword ?
                        <button ref={btnRef} type={'submit'}>
                            Login
                        </button> :
                        <button disabled type={'submit'}>
                            Login
                        </button>
                    }

                    { authError ? <p> error </p> : null }

                    <div className="additionalInfo">
                        <p>Don’t have an account? <Link to={'/register'}> Sign Up</Link></p>
                    </div>

                </form>

            </div>
        </div>
    )
};

export default Auth
