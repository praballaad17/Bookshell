import React, { useState, useContext } from 'react'
import * as ROUTES from '../constants/routes';
import { Link, Route, useHistory } from 'react-router-dom';
import { faBars, faBell, faBook, faBookmark, faChild, faCog, faHome, faIdCard, faList, faMailBulk, faPlus, faSignOutAlt, faUniversity, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from '../context/userContext';
import ToggleBar from './toggleBar';
import { logout } from '../services/authenticationServices';

export default function Leftbar() {
    const [show, setShow] = useState(false)
    const { user } = useUser();
    const loggedInUser = user;

    const history = useHistory();


    return (
        <>
            <div className="leftbar__toglebar">
                <ToggleBar show={show} user={user} loggedInUser={loggedInUser} onClose={() => setShow(false)} />
            </div>

            <div className="leftbar">
                <ul className="link-list">
                    <li className="link-list-item">
                        <Link className="u-center-text heading-logo" to={ROUTES.DASHBOARD} aria-label="LOGO">
                            Book'n'things
                        </Link>
                    </li>

                    <li className="link-list-item">
                        <Link className="link" to={ROUTES.DASHBOARD} aria-label="Dashboard">
                            <span className="link--icon">
                                <FontAwesomeIcon icon={faHome} /></span>
                            <span className="link--text">My Library</span>
                        </Link>
                    </li>
                    {loggedInUser && <>
                        <li className="link-list-item">
                            <Link className="link" to={ROUTES.REQUEST} aria-label="Bookshell">
                                <span className="link--icon">
                                    <FontAwesomeIcon icon={faBook} />
                                </span>
                                <span className="link--text">Request Your Book</span>
                            </Link>
                        </li>
                        <li className="link-list-item">
                            <Link className="link" to={ROUTES.BOOKSHELL} aria-label="Bookshell">
                                <span className="link--icon">
                                    <FontAwesomeIcon icon={faCog} />
                                </span>
                                <span className="link--text">Settings</span>
                            </Link>
                        </li>
                        <li className="toggle-sidebar__item">
                            <Link className="toggle-sidebar__link" to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                <span className="toggle-sidebar__link--icon">
                                    <FontAwesomeIcon icon={faIdCard} />
                                </span>
                                <span className="toggle-sidebar__link--text">Your Cards</span>
                            </Link>
                        </li>
                        <li className="toggle-sidebar__item">
                            <Link className="toggle-sidebar__link" to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                <span className="toggle-sidebar__link--icon">
                                    <FontAwesomeIcon icon={faUniversity} />
                                </span>
                                <span className="toggle-sidebar__link--text">Add Bank</span>
                            </Link>
                        </li>


                    </>
                    }
                    {loggedInUser ? (
                        <>
                            <li className="toggle-sidebar__item"
                                onClick={() => {
                                    logout();
                                    window.location = ROUTES.LOGIN
                                }}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        logout();
                                        window.location = ROUTES.LOGIN
                                    }
                                }}>
                                <div className="toggle-sidebar__link" >
                                    <span className="toggle-sidebar__link--icon">
                                        <FontAwesomeIcon icon={faSignOutAlt} />
                                    </span>
                                    <span className="toggle-sidebar__link--text">Log Out</span>
                                </div>
                            </li>
                            <li className="link-list-item link-list-item--newpost" >
                                <Link className="link" to={ROUTES.NEWPOST} aria-label="Newpost">
                                    <span className="link--icon">
                                        <FontAwesomeIcon icon={faPlus} /></span>
                                    <span className="link--text">New Post</span>
                                </Link>
                            </li>
                        </>) : (
                        <li className="link-list-item link-list-item--newpost" >
                            <Link className="link" to={ROUTES.LOGIN} aria-label="Newpost">
                                <span className="link--icon">
                                    <FontAwesomeIcon icon={faSignOutAlt} /></span>
                                <span className="link--text">Log In</span>
                            </Link>
                        </li>
                    )}
                </ul>
            </div >
        </>
    )
}
