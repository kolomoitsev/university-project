import React from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../assets/img/avpz-logo.png'

const Header  = () => {

    return  (
        <div className="container-fluid HeaderMain customBg">
            <div className="row h-100">
                <div className="col-md-3 headerLogo">
                    <a href="/">
                        <img src={logo} alt=""/>
                    </a>
                </div>
                <div className="col-md-9 headerMenu">
                    <ul>
                        <li><a href="/parse">Parse document</a></li>
                        <li><a href="/history">Parse history</a></li>
                        <li><a href="/templates">Templates</a></li>
                        <li><a className="signoutBtn customBtn" href="/">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )


}

export default Header
