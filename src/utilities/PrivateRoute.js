import React from 'react';
import {Navigate, Route} from 'react-router-dom';

const PrivateRoute = ({ component, ...rest }) => (
    <Route {...rest} render={(props) => (
      localStorage.getItem('token') ? (
        React.createElement(component, props)
      ) : (
        <Navigate to={{
          pathname: '/login',
        }} />
      )
    )} />
  );
  
  export default PrivateRoute;