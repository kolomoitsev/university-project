import React from 'react';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import {AuthPage, HomePage, RegisterPage, TemplateEditorPage, TemplatesPage, ParsePage} from "./pages/pages";

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

                <Route path="/templates/:id" component={() => (<TemplateEditorPage/>)}/>

                <Route path="/templates" component={() => (<TemplatesPage/>)}/>

                <Route path="/parse" component={() => (<ParsePage/>)}/>

                <Route path="/" component={() => (<HomePage/>)}/>
            </Switch>
        </Router>

    )
};

export default App;
