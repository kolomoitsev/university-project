import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({component: Component, path, ...rest}) => (
    <Route
        {...rest}
        render={props => (
            !localStorage.getItem('token'))
            ? <Redirect to="/auth"/> : <Component {...props} />
        }
    />

);
export default PrivateRoute;
