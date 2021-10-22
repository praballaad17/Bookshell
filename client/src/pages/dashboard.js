import { useEffect, lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { faBell, faHome, faMailBulk, faPlusSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as ROUTES from '../constants/routes';
import useUser from '../hooks/use-user';
import LoggedInUserContext from '../context/logged-in-user';
import Leftbar from '../components/leftbar';
import Header from '../components/header';
import SearchBar from '../components/leftbar/searchBar';

const Material = lazy(() => import('../components/leftbar/material'));
const SearchResult = lazy(() => import('../components/leftbar/searchResult'));
const Profile = lazy(() => import('./profile'));
const Timeline = lazy(() => import('../components/timeline'));
const Messages = lazy(() => import('../components/messages'));
const Newpost = lazy(() => import('../components/newpost/newpost'));
const Bookshell = lazy(() => import('../components/bookshell/bookshell'));

export default function Dashboard({ user: loggedInUser }) {
  const [show, setShow] = useState(false)
  const [searchResult, setSearchResult] = useState([])
  const userId = loggedInUser ? loggedInUser.id : null
  const username = loggedInUser ? loggedInUser.username : null
  const { user, setActiveUser } = useUser(username);
  let { path, url } = useRouteMatch();

  useEffect(() => {
    document.title = 'Touch';
  }, []);


  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser, searchResult, setSearchResult }}>

      {/* <Header /> */}

      <div className="dashboard">

        <div className="dashboard__leftbar">
          <Leftbar path={path} url={url} />
        </div>
        <div className="dashboard__main">
          <div className="dashboard__searchbar">
            <SearchBar searchResult={searchResult} setSearchResult={setSearchResult} />
          </div>

          <Switch>

            <Redirect exact from={ROUTES.DASHBOARD} to={ROUTES.BOOKSHELL} />
            <Route path={ROUTES.BOOKSHELL} component={Bookshell} />
            <Route path={ROUTES.NEWPOST} component={Newpost} />
            <Route path={ROUTES.SEARCHRESULT} component={SearchResult} />
            <Route path={ROUTES.MATERIAL} component={Material} />
          </Switch>
        </div>

      </div>

    </LoggedInUserContext.Provider>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};
