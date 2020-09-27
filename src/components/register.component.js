import React, {createRef, useEffect, useState} from "react";
import * as $ from 'jquery'
import axios from 'axios'

import '../App.css';
import {Link} from "react-router-dom";

const EMAIL_REGEX_CHECK = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Register = () => {

    const nameRef = createRef();
    const emailRef = createRef();
    const passRef = createRef();
    const repeatRef = createRef();
    const meter = createRef();

    const formFRef = createRef();
    const formSRef = createRef();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [repeatPass, setRepeatPass] = useState('');

    const [passwordStrength, setPasswordStrength] = useState(false);

    const [validName, setValidName] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validPasses, setValidPasses] = useState(false);

    const [registerError, setRegisterError] = useState(null)

    function checkpassword(password) {
        var strength = 0;
        if (password.match(/[a-z]+/)) {
            strength += 1;
        }
        if (password.match(/[A-Z]+/)) {
            strength += 1;
        }
        if (password.match(/[0-9]+/)) {
            strength += 1;
        }
        if (password.match(/[$@#&!]+/)) {
            strength += 1;

        }

        switch (strength) {
            case 0:
                meter.current.value = 0;
                setPasswordStrength(false);
                break;

            case 1:
                meter.current.value = 25;
                setPasswordStrength(false);
                break;

            case 2:
                meter.current.value = 50;
                setPasswordStrength(false);
                break;

            case 3:
                meter.current.value = 75;
                setPasswordStrength(true);
                break;

            case 4:
                meter.current.value = 100;
                setPasswordStrength(true);
                break;
        }
    }

    useEffect(() => {
        $(formSRef.current).hide()
    }, []);

    useEffect(() => {


        const validateRegister = () => {

            /* check for name // name > 4 symbols  */

            if (name === '') {
                $(nameRef.current).css({
                    borderBottom: '1px solid #000',
                });
                setValidName(false)
            } else if (name.length < 4) {
                $(nameRef.current).css({
                    borderBottom: '1px solid red',
                });
                setValidName(false)
            } else {
                $(nameRef.current).css({
                    borderBottom: '1px solid green',
                });
                setValidName(true)
            }

            /* check for email */

            if (email.length < 5) {
                $(emailRef.current).css({
                    borderBottom: `1px solid grey`,
                });
                setValidEmail(false)
            } else if (email.length > 5 && EMAIL_REGEX_CHECK.test(email)) {
                $(emailRef.current).css({
                    borderBottom: `1px solid green`,
                });
                setValidEmail(true)
            } else {
                $(emailRef.current).css({
                    borderBottom: `1px solid red`,
                });
                setValidEmail(false)
            }

            /* check for pass && pass repeated */


            if (pass.length > 3 && pass !== repeatPass) {
                $(repeatRef.current).css({
                    borderBottom: `1px solid red`,
                });
                setValidPasses(false)
            } else if (pass === repeatPass) {
                $(repeatRef.current).css({
                    borderBottom: `1px solid green`,
                });
                setValidPasses(true)
            }


            /* check for passwordStrength */

            checkpassword(pass)

        };

        validateRegister()

    }, [name, email, pass, repeatPass]);

    const handleRegister = event => {
        event.preventDefault();
        //console.log(name, email, pass, repeatPass)

        axios.post(`${process.env.REACT_APP_API_SERVER}/auth/users/`, {
            username: email,
            password: pass,
        })
            .then( res => {
                window.location.href = '/'
            })
            .catch(err => setRegisterError(err))

    };

    const showSecondPart = () => {
        $(formSRef.current).show();
        $(formFRef.current).hide()
    };

    const showFirstPart = () => {
        $(formSRef.current).hide();
        $(formFRef.current).show()
    };

    return (
        <div className="RegisterComponent">

            <div className="RegisterComponentWrapper">

                <form onSubmit={handleRegister}>

                    <span>
                        Welcome
                    </span>

                    <div ref={formFRef} className="RegisterStep step1">

                        <div className="inputGroup">


                            <div className="Area user-input-wrp">
                                <br/>
                                <input
                                    type="text"
                                    className="inputText"
                                    ref={nameRef}
                                    onChange={event => setName(event.target.value)}
                                    required
                                />
                                <span className="floating-label">Name</span>
                            </div>

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


                            {/*<input*/}
                            {/*    ref={nameRef}*/}
                            {/*    onChange={event => setName(event.target.value)}*/}
                            {/*    type="text"*/}
                            {/*    placeholder={'Enter your name'}/>*/}

                            {/*<input*/}
                            {/*    ref={emailRef}*/}
                            {/*    onChange={event => setEmail(event.target.value)}*/}
                            {/*    type="text"*/}
                            {/*    placeholder={'Enter your email'}*/}
                            {/*/>*/}

                            {
                                validName && validEmail ?
                                    <button type="button" onClick={(event) => showSecondPart()}>Next</button> :
                                    <button disabled type="button">Next</button>
                            }



                        </div>

                        

                    </div>

                    <div ref={formSRef} className="RegisterStep step2">


                        <div className="Area user-input-wrp">
                            <br/>
                            <input
                                type="password"
                                className="inputText"
                                ref={passRef}
                                onChange={event => setPass(event.target.value)}
                                required
                            />
                            <span className="floating-label">Password</span>
                        </div>


                        {/*<input*/}
                        {/*    ref={passRef}*/}
                        {/*    onChange={event => setPass(event.target.value)}*/}
                        {/*    type="password"*/}
                        {/*    placeholder={'Enter your password'}*/}

                        {/*/>*/}


                        <div className="Area user-input-wrp">
                            <br/>
                            <input
                                type="password"
                                className="inputText"
                                ref={repeatRef}
                                onChange={event => setRepeatPass(event.target.value)}
                                required
                            />
                            <span className="floating-label">Repeat Password</span>
                        </div>

                        {/*<input*/}
                        {/*    ref={repeatRef}*/}
                        {/*    onChange={event => setRepeatPass(event.target.value)}*/}
                        {/*    type="password"*/}
                        {/*    placeholder={'Repeat password'}*/}

                        {/*/>*/}

                        <div className="passwordStrength">
                            <progress ref={meter} max="100" value="0" id="meter"></progress>
                        </div>

                        <div className="buttonsWrapper completeRegistration">

                            <button type={'button'} onClick={() => showFirstPart()}>Back</button>


                            {
                                passwordStrength && validPasses ? <button type={"submit"}>Sign up</button> :
                                    <button disabled type={"submit"}>Sign up</button>
                            }


                        </div>

                        { registerError ? <p> error  </p> : null }

                    </div>

                    <div className="additionalInfo">
                        <p>Already have account? <Link to={'/auth'}> Sign In</Link></p>
                    </div>

                </form>

            </div>
        </div>
    )
};

export default Register
