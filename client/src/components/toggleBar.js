import React from 'react'
import * as ROUTES from '../constants/routes';
import { Link } from 'react-router-dom';
import { faBookmark, faCog, faIdCard, faList, faSignOutAlt, faTimes, faUniversity, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from '../services/authenticationServices';
import ReactDom from 'react-dom'

export default function ToggleBar({ show, onClose, user, loggedInUser }) {
    if (!show) return null
    return ReactDom.createPortal(
        <>
            <div className="togglebar-overlay" onClick={onClose}></div>
            <div className="toggle-sidebar">
                <div className="toggle-sidebar__close" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
                <ul>
                    <li className="toggle-sidebar__item">
                        <Link className="toggle-sidebar__link" to={`/user/${user?.username}`} aria-label="Dashboard">
                            <span className="toggle-sidebar__link--icon">
                                <FontAwesomeIcon icon={faUser} /></span>
                            <span className="toggle-sidebar__link--text">Profile</span>
                        </Link>
                    </li>
                    {loggedInUser ? (
                        <>
                            <li className="toggle-sidebar__item">
                                <Link className="toggle-sidebar__link" to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                    <span className="toggle-sidebar__link--icon">
                                        <FontAwesomeIcon icon={faBookmark} />
                                    </span>
                                    <span className="toggle-sidebar__link--text">Bookmarks</span>
                                </Link>
                            </li>
                            <li className="toggle-sidebar__item">
                                <Link className="toggle-sidebar__link" to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                    <span className="toggle-sidebar__link--icon">
                                        <FontAwesomeIcon icon={faList} />
                                    </span>
                                    <span className="toggle-sidebar__link--text">List</span>
                                </Link>
                            </li>
                            <li className="toggle-sidebar__item">
                                <Link className="toggle-sidebar__link" to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                    <span className="toggle-sidebar__link--icon">
                                        <FontAwesomeIcon icon={faCog} />
                                    </span>
                                    <span className="toggle-sidebar__link--text">Settings</span>
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
                        </>) : (
                        <li className="link-list-item link-list-item--newpost" >
                            <Link className="link" to={ROUTES.LOGIN} aria-label="Newpost">
                                <span className="link--icon">
                                    <FontAwesomeIcon icon={faSignOutAlt} /></span>
                                <span className="link--text">Log In</span>
                            </Link>
                        </li>
                    )
                    }                    </ul>
            </div>
        </>,
        document.getElementById("togglebar")
    )
}
