import React, {createRef, useEffect, useState} from "react";
import * as $ from 'jquery'

import '../App.css';

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


        const validateRegister = async () => {

            /* check for name // name > 4 symbols  */

            if (name === '') {
                $(nameRef.current).css({
                    borderBottom: '3px solid #000',
                });
                setValidName(false)
            } else if (name.length < 4) {
                $(nameRef.current).css({
                    borderBottom: '3px solid red',
                });
                setValidName(false)
            } else {
                $(nameRef.current).css({
                    borderBottom: '3px solid green',
                });
                setValidName(true)
            }

            /* check for email */

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

            /* check for pass && pass repeated */


            if (pass.length > 3 && pass !== repeatPass) {
                $(repeatRef.current).css({
                    borderBottom: `3px solid red`,
                });
                setValidPasses(false)
            } else if (pass.length > 3 && pass === repeatPass) {
                $(repeatRef.current).css({
                    borderBottom: `3px solid green`,
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
        console.log(name, email, pass, repeatPass)
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

                    <div ref={formFRef} className="RegisterStep step1">

                        <input
                            ref={nameRef}
                            onChange={event => setName(event.target.value)}
                            type="text"
                            placeholder={'Enter your name'}/>

                        <input
                            ref={emailRef}
                            onChange={event => setEmail(event.target.value)}
                            type="text"
                            placeholder={'Enter your email'}
                        />

                        {
                            validName && validEmail ?
                                <button type="button" onClick={(event) => showSecondPart()}>Next</button> :
                                <button disabled type="button">Next</button>
                        }

                    </div>

                    <div ref={formSRef} className="RegisterStep step2">

                        <input
                            ref={passRef}
                            onChange={event => setPass(event.target.value)}
                            type="password"
                            placeholder={'Enter your password'}

                        />


                        <input
                            ref={repeatRef}
                            onChange={event => setRepeatPass(event.target.value)}
                            type="password"
                            placeholder={'Repeat password'}

                        />

                        <div className="passwordStrength">
                            <progress ref={meter} max="100" value="0" id="meter"></progress>
                        </div>

                        <div className="buttonsWrapper">

                            <button type={'button'} onClick={() => showFirstPart()}>Back</button>


                            {
                                passwordStrength && validPasses ? <button type={"submit"}>Sign up</button> :
                                    <button disabled type={"submit"}>Sign up</button>
                            }


                        </div>


                    </div>


                </form>

            </div>
        </div>
    )
};

export default Register
