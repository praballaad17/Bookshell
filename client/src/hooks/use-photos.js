import { useState, useEffect } from 'react';
import { getPost, retrivePostByUserId } from '../services/postServices';

export default function usePhotos(user, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [posts, setPosts] = useState([]);
  const [hasMore, setMore] = useState(false)

  useEffect(async () => {
    setLoading(true)
    setError(false)
    async function getTimelinePhotos() {

      if (user?.following?.length > 0) {
        try {
          const post = await getPost(user._id, pageNumber, 5);
          setPosts(prevPost => { return [...prevPost, ...post.result] });
          setMore(post.result.length > 0)
          setLoading(false)
        } catch (error) {
          setError(true)
          console.log(error);
        }
      }
    }

    getTimelinePhotos();
  }, [user?.userId, user?.following, pageNumber]);

  return { posts, loading, error, hasMore, setPosts };
}
