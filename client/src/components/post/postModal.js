import React, { useContext } from 'react'
import { useState } from 'react'
import ReactDom from 'react-dom'
import { Link, useHistory, useLocation } from 'react-router-dom'
import LoggedInUserContext from '../../context/logged-in-user'
import { deletePostById } from '../../services/postServices'
import usePhotos from '../../hooks/use-photos'
import { DASHBOARD } from '../../constants/routes'
import TimeLineContext from '../../context/timeline'

export default function PostModal({ open, content, onClose, setProfile, photosCollection }) {
    const [profileImg, setProfileImg] = useState()
    const { user } = useContext(LoggedInUserContext)
    const { posts, setPosts } = useContext(TimeLineContext)
    const { pathname } = useLocation()

    if (!open) return null

    const unfollow = async () => {
        // try {
        //     await toggleFollow(true, content.author, user._id)
        //     window.location = `/user/${user.username}`
        // } catch (error) {
        //     console.log(error);
        // }
    }

    const notLikedPost = () => {
        localStorage.setItem("dontLikePost", JSON.stringify({ postId: content._id, author: content.author }))
        setPosts(posts.filter(item => item._id != content._id))
        onClose()
    }

    const deletePost = () => {
        if (pathname == "/") {
            setPosts(posts.filter(item => item._id != content._id))
            // window.location = pathname
        }
        else
            setPosts({ photosCollection: photosCollection.filter(item => item._id != content._id) })
        deletePostById(content._id).then(() => {


        }).catch(e => {
            alert("Error while deleting the Post, generally check your internet");
            console.log(e, content);
            if (pathname == "/") {
                setPosts(prevPost => [...prevPost, content])
                // window.location = pathname
            }
            else
                setPosts({ photosCollection: photosCollection.push(content) })

        })
    }

    return ReactDom.createPortal(
        <>
            <div className="modal-layout" onClick={onClose}></div>
            <div className="modal-box">
                <ul className="modal-box__list">
                    <li className="modal-box__item" ><Link target="_blanck" to={`/user/${content?.author}`} >Share</Link></li>
                    {content.author != user.username && <li className="modal-box__item u-text-red-bold" onClick={unfollow} >Unfollow</li>}
                    {content.author == user.username && < li className="modal-box__item u-text-red-bold" onClick={deletePost} >Delete Post</li>}
                    {content.author != user.username && <li className="modal-box__item u-text-red-bold" onClick={notLikedPost} >I don't link this Post</li>}
                    <li className="modal-box__item" onClick={onClose}>Cancel</li>
                </ul>
            </div>
        </>,
        document.getElementById("modal")
    )
}
