import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, useLocation } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { useContext } from 'react';
import UserContext from '../context/user';
import { getCurrentUser } from '../services/authenticationServices';

export default function ProtectedRoute({ children, ...rest }) {
  const user = getCurrentUser()
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return React.cloneElement(children, { user });
        }

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: ROUTES.LOGIN,
                state: { from: location }
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired
};
