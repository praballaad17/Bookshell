import { useEffect, lazy, Suspense, useState } from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as ROUTES from '../constants/routes';
import { useUser } from '../context/userContext';
import Leftbar from '../components/leftbar';
import SearchBar from '../components/leftbar/searchBar';
import ReactLoader from '../components/loader';
import ProtectedRoute from '../helpers/protected-route';

const Request = lazy(() => import('../components/newpost/request'));
const Material = lazy(() => import('../components/leftbar/material'));
const SearchResult = lazy(() => import('../components/leftbar/searchResult'));
const Newpost = lazy(() => import('../components/newpost/newpost'));
const Bookshell = lazy(() => import('../components/bookshell/bookshell'));

export default function Dashboard({ user: loggedInUser }) {
  const [show, setShow] = useState(false)
  const [searchResult, setSearchResult] = useState([])
  const { user } = useUser();
  console.log(user);
  let { path, url } = useRouteMatch();


  useEffect(() => {
    document.title = "Book'N'Things";
  }, []);


  return (
    <div className="dashboard">
      <div className="dashboard__leftbar">
        <Leftbar path={path} url={url} />
      </div>
      <div className="dashboard__main">
        <div className="dashboard__searchbar">
          <SearchBar />
        </div>
        <Suspense fallback={<ReactLoader />}>
          <Switch>
            <Redirect exact from={ROUTES.DASHBOARD} to={ROUTES.BOOKSHELL} />
            <ProtectedRoute user={loggedInUser} path={ROUTES.BOOKSHELL}  >
              <Bookshell />
            </ProtectedRoute>
            <ProtectedRoute user={loggedInUser} path={ROUTES.NEWPOST}  >
              <Newpost />
            </ProtectedRoute>
            <ProtectedRoute user={loggedInUser} path={ROUTES.SEARCHRESULT}  >
              <SearchResult />
            </ProtectedRoute>
            <ProtectedRoute user={loggedInUser} path={ROUTES.MATERIAL}  >
              <Material />
            </ProtectedRoute>
            <ProtectedRoute user={loggedInUser} path={ROUTES.REQUEST}  >
              <Request />
            </ProtectedRoute>
          </Switch>
        </Suspense>
      </div>

    </div>

  );
}

