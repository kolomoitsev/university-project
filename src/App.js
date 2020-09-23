import React from 'react';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {AuthPage, HomePage, RegisterPage, ImgEditorPage} from "./pages/pages";

import PrivateRoute from './components/privateRoute.component'
import GuestRoute from "./components/guestRoute.component";

import './App.css';

require('dotenv').config();


const App = () => {
    return (

        <Router>
            <Switch>
                <GuestRoute path={'/auth'} component={() => (<AuthPage/>)}/>

                <GuestRoute path={"/register"} component={() => <RegisterPage/>}/>

                <PrivateRoute path="/" component={() => (<HomePage/>)}/>

                <PrivateRoute path="/img-editor" component={() => (<ImgEditorPage/>)}/>
            </Switch>
        </Router>

    )
};

export default App;
