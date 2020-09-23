import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const GuestRoute = ({component: Component, path, ...rest}) => (
    <Route
        {...rest}
        render={props => (
            localStorage.getItem('token'))
            ? <Redirect to="/"/> : <Component {...props} />
        }
    />

);
export default GuestRoute;
