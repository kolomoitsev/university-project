import React from 'react';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import {AuthPage, HomePage, RegisterPage, TemplateEditorPage, TemplatesPage, ParsePage, ParseHistoryPage} from "./pages/pages";

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

                <PrivateRoute path="/templates/:id" component={() => (<TemplateEditorPage/>)}/>

                <PrivateRoute path="/templates" component={() => (<TemplatesPage/>)}/>

                <PrivateRoute path="/parse" component={() => (<ParsePage/>)}/>

                <PrivateRoute path="/history" component={ () => (<ParseHistoryPage />) } />

                <PrivateRoute path="/" component={() => (<HomePage/>)}/>
            </Switch>
        </Router>

    )
};

export default App;
