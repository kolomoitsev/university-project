import React, {createRef, useEffect, useState} from "react";
import * as $ from 'jquery'

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const EMAIL_REGEX_CHECK = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Auth = () => {

    const emailRef = createRef();
    const passwordRef = createRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [validEmail, setValidEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);

    useEffect(() => {

        const validateForm = async () => {

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

            if (password.length === 0) {
                $(passwordRef.current).css({
                    borderBottom: `3px solid grey`,
                });
                setIsPassword(false)
            } else if (password.length > 6) {
                $(passwordRef.current).css({
                    borderBottom: `3px solid green`,
                });
                setIsPassword(true)
            } else {
                $(passwordRef.current).css({
                    borderBottom: `3px solid red`,
                });
                setIsPassword(false)
            }

        };

        validateForm()

    }, [email, password, validEmail, isPassword]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email, password)
    };

    return (
        <div className="AuthComponent">
            <div className="AuthComponentWrapper">

                <form onSubmit={handleSubmit}>

                    <input ref={emailRef} type="text" onChange={event => setEmail(event.target.value)}
                           placeholder={'Enter your email'}/>

                    <input ref={passwordRef} type="password" onChange={event => setPassword(event.target.value)}
                           placeholder={'Enter your password'}/>

                    {validEmail && isPassword ?
                        <button type={'submit'}>
                            Sign in
                        </button> :
                        <button disabled type={'submit'}>
                            Sign in
                        </button>
                    }

                </form>

            </div>
        </div>
    )
};

export default Auth
