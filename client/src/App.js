import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactLoader from './components/loader';
import * as ROUTES from './constants/routes';
import { UserProvider } from './context/userContext';
import useAuthListener from './hooks/use-auth-listener';

import ProtectedRoute from './helpers/protected-route';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const NotFound = lazy(() => import('./pages/not-found'));

export default function App() {
  const user = useAuthListener()

  return (
    <UserProvider user={user}>
      <Router>
        <Suspense fallback={<ReactLoader />}>
          {/* <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.PROFILE} component={Profile} /> 
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD}  >
              <Dashboard />
            </ProtectedRoute>
            <Route component={NotFound} />
          </Switch> */}

          <Switch>
            <Route path={ROUTES.LOGIN} component={() => <Login user={user} />} />
            <Route path={ROUTES.SIGN_UP} component={() => <SignUp user={user} />} />
            <Route path={ROUTES.DASHBOARD} component={() => <Dashboard user={user} />} />

            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserProvider>
  );
}
