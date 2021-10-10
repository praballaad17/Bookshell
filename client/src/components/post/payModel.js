import React, { useContext } from 'react'
import { useState } from 'react'
import ReactDom from 'react-dom'
import { Link, useHistory, useLocation } from 'react-router-dom'
import LoggedInUserContext from '../../context/logged-in-user'
import { deletePostById } from '../../services/postServices'
import usePhotos from '../../hooks/use-photos'
import { DASHBOARD } from '../../constants/routes'
import TimeLineContext from '../../context/timeline'
import { DEFAULT_IMAGE_PATH } from '../../constants/paths'

export default function PayModal({ open, onClose, }) {
    const [profileImg, setProfileImg] = useState()
    const { user } = useContext(LoggedInUserContext)
    const { posts, setPosts } = useContext(TimeLineContext)
    const { pathname } = useLocation()

    if (!open) return null



    return ReactDom.createPortal(
        <>
            <div className="modal-layout" onClick={onClose}></div>
            <div className="modal-box">
                <ul className="modal-box__list">
                    <div className="post__header">
                        <Link to={`/user/${user.username}`} className="flex items-center">
                            <img
                                className="post__header--img"
                                src={user?.displayImg ? user.displayImg.profileImg : DEFAULT_IMAGE_PATH}
                                alt={`${user.username} profile picture`}
                            />
                            <p className="font-bold">{user.username}</p>
                        </Link>
                    </div>
                    <li className="modal-box__item u-text-red-bold" >
                        <button className="btn btn-login" >Pay</button>
                    </li>
                    <li className="modal-box__item" onClick={onClose}>Cancel</li>
                </ul>
            </div>
        </>,
        document.getElementById("modal")
    )
}
