import { useState, useEffect } from 'react';
import { getPost, getUserPhotosByUsername, retrivePostByUserId } from '../services/postServices';

export default function useProfilePost(user, logginUserId, pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [posts, setPosts] = useState([]);
    const [hasMore, setMore] = useState(false)

    useEffect(async () => {
        setLoading(true)
        setError(false)
        async function getProfilePost() {

            try {
                const post = await getUserPhotosByUsername(user.username, logginUserId, pageNumber, 5);
                console.log(post);
                setPosts(prevPost => { return [...prevPost, ...post.result] });
                setMore(post.result.length > 0)
                setLoading(false)
            } catch (error) {
                setError(true)
                console.log(error);
            }
        }

        getProfilePost();
    }, [user, pageNumber, logginUserId]);
    return { posts, loading, error, hasMore, setPosts };
}
