import React, { useState, useContext } from 'react'
import * as ROUTES from '../constants/routes';
import { Link, Route, useHistory } from 'react-router-dom';
import { faBars, faBell, faBook, faBookmark, faChild, faCog, faHome, faIdCard, faList, faMailBulk, faPlus, faSignOutAlt, faUniversity, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from '../context/user';
import useUser from '../hooks/use-user';
import ToggleBar from './toggleBar';
import { getuserDisplayImgs } from '../services/userServices';
import { useEffect } from 'react';
import { DEFAULT_IMAGE_PATH } from '../constants/paths';
import { logout } from '../services/authenticationServices';

export default function Leftbar() {
    const [show, setShow] = useState(false)
    const [profileImg, setProfileImg] = useState()
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser?.username);

    const history = useHistory();

    useEffect(async () => {
        await getuserDisplayImgs(user?.username).then((res) => {
            !res.displayImg || res.displayImg.profileImg.length ?
                setProfileImg(res.displayImg.profileImg)
                :
                setProfileImg(DEFAULT_IMAGE_PATH)
        }).catch(err => {
            console.log(err);
        })

        // setProfileImg(result?.displayImg?.profileImg)

    }, [user])

    return (
        <>
            <div className="leftbar__toglebar">
                <ToggleBar show={show} user={user} loggedInUser={loggedInUser} onClose={() => setShow(false)} />
            </div>

            <div className="leftbar">
                <ul className="link-list">
                    <li className="link-list-item">
                        <Link className="u-center-text heading-logo" to={ROUTES.DASHBOARD} aria-label="LOGO">
                            Bookshell
                        </Link>
                    </li>

                    <li className="link-list-item">
                        <Link className="link" to={ROUTES.DASHBOARD} aria-label="Dashboard">
                            <span className="link--icon">
                                <FontAwesomeIcon icon={faHome} /></span>
                            <span className="link--text">Home</span>
                        </Link>
                    </li>
                    {loggedInUser && <> <li className="link-list-item">
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
