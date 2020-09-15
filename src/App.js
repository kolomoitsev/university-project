import React from 'react';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {AuthPage, HomePage, RegisterPage} from "./pages/pages";

import './App.css';

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
                <Route path="/">
                    <HomePage/>
                </Route>
            </Switch>
        </Router>

    )
};

export default App;
