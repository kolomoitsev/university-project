import React from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthPage, HomePage, RegisterPage } from "./pages/pages";

import PrivateRoute from './components/privateRoute.component'

import './App.css';

require('dotenv').config();


const App = () => {
    return (

        <Router>
            <Switch>



                <Route path="/auth">
                    <AuthPage/>
                </Route>
                <Route path="/register">
                    <RegisterPage/>
                </Route>
                <PrivateRoute path="/" component={ () => (<HomePage/>) }/>

                {/*<Route path="/">*/}
                {/*    <HomePage/>*/}
                {/*</Route>*/}

            </Switch>
        </Router>

    )
};

export default App;
