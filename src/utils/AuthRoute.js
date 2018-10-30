import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({user, component: Component, ...rest}) => {
    return <Route {...rest} render={ props => 
        user ? 
            <Component { ...props} />
        :
            <Redirect to="/" />
    } />
}

export default AuthRoute;