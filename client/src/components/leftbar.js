import React, { useState, useContext } from 'react'
import * as ROUTES from '../constants/routes';
import { Link, Route, useHistory } from 'react-router-dom';
import { faBars, faBell, faBookmark, faChild, faCog, faHome, faIdCard, faList, faMailBulk, faPlus, faSignOutAlt, faUniversity, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from '../context/user';
import useUser from '../hooks/use-user';
import ToggleBar from './toggleBar';
import { getuserDisplayImgs } from '../services/userServices';
import { useEffect } from 'react';
import { DEFAULT_IMAGE_PATH } from '../constants/paths';

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
                        <Link className="u-center-text" to={`/user/${user?.username}`} aria-label="Profile">
                            <img className="link-list--proImg" src={profileImg} onError={(e) => {
                                e.target.src = DEFAULT_IMAGE_PATH;
                            }} alt={user?.username} />
                            <span className="link--text">{user?.username}</span>
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
                        <Link className="link" to={ROUTES.DASHBOARD} aria-label="Dashboard">
                            <span className="link--icon">
                                <FontAwesomeIcon icon={faBell} />
                            </span>
                            <span className="link--text">Notifications</span>
                        </Link>
                    </li>
                        <li className="link-list-item">
                            <Link className="link" to={`${ROUTES.MESSAGES}`} aria-label="Messages">
                                <span className="link--icon">
                                    <FontAwesomeIcon icon={faMailBulk} />
                                </span>
                                <span className="link--text">Messages</span>
                            </Link>
                        </li>
                        <li className="link-list-item">
                            <Link className="link" to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                <span className="link--icon"><FontAwesomeIcon icon={faBookmark} /></span>
                                <span className="link--text">Bookmarks</span>
                            </Link>
                        </li>
                        <li className="link-list-item">
                            <Link className="link" to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                <span className="link--icon">
                                    <FontAwesomeIcon icon={faList} /></span>
                                <span className="link--text">List</span>
                            </Link>
                        </li>
                        <li className="link-list-item">
                            <Link className="link" to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                <span className="link--icon">
                                    <FontAwesomeIcon icon={faChild} /></span>
                                <span className="link--text">Subscription</span>
                            </Link>
                        </li>
                        <li className="link-list-item">
                            <Link className="link" to={`/user/${user?.username}`} aria-label="Dashboard">
                                <span className="link--icon">
                                    <FontAwesomeIcon icon={faUser} /></span>
                                <span className="link--text">My Profile</span>
                            </Link>
                        </li>
                    </>
                    }
                    <li className="link-list-item" onClick={() => setShow(true)}>
                        <Link className="link"  >
                            <span className="link--icon">
                                <FontAwesomeIcon icon={faBars} /></span>
                            <span className="link--text">More</span>
                        </Link>
                    </li>
                    {loggedInUser ? (
                        <li className="link-list-item link-list-item--newpost" >
                            <Link className="link" to={ROUTES.NEWPOST} aria-label="Newpost">
                                <span className="link--icon">
                                    <FontAwesomeIcon icon={faPlus} /></span>
                                <span className="link--text">New Post</span>
                            </Link>
                        </li>) : (
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
