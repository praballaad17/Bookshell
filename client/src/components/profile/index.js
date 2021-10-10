import { useReducer, useEffect, useContext, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Skeleton from 'react-loading-skeleton';
import Post from '../post';
import { getUserPhotosByUsername } from '../../services/postServices';
import { getuserDisplayImgs } from '../../services/userServices';
import { NEWPOST } from '../../constants/routes';
import TimeLineContext from '../../context/timeline';
import LoggedInUserContext from '../../context/logged-in-user';
import useProfilePost from '../../hooks/useProfilePost';

export default function Profile({ user }) {
  const [pageNumber, setPageNumber] = useState(1)
  const { user: logginUser } = useContext(LoggedInUserContext)
  const { posts, loading, hasMore, error, setPosts } = useProfilePost(user, logginUser?._id, pageNumber);
  const reducer = (state, newState) => ({ ...state, ...newState });

  const observer = useRef()
  const lastPostRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prePage => prePage + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  const initialState = {
    profile: {},
    photosCollection: null,
    followerCount: 0,
    displayImgs: {}
  };
  const [{ profile, photosCollection, followerCount, displayImgs }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      console.log(posts);
      const { displayImg } = await getuserDisplayImgs(user.username)
      dispatch({ profile: user, photosCollection: posts, followerCount: user.followers.length, displayImgs: displayImg });
    }
    getProfileInfoAndPhotos();
  }, [user, pageNumber, logginUser]);
  console.log(posts, photosCollection);
  return (
    <>
      <TimeLineContext.Provider value={{ user, posts: posts, setPosts: dispatch }}>
        <Header
          photosCount={photosCollection ? photosCollection.length : 0}
          profile={profile}
          followerCount={followerCount}
          displayImgs={displayImgs}
          setProfile={dispatch}
        />
        {!posts ? (
          <Skeleton count={4} width={640} height={500} className="mb-5" />
        ) : (
          <>
            {posts.length ?
              (posts.map((content, index) => {
                if (posts.length === index + 1) {
                  return <Post postref={lastPostRef} key={content?.post._id} content={content} />
                }
                else {
                  return <Post key={content?.post._id} content={content} profileImg={displayImgs.profileImg} />
                }
              })
                // posts.map((content) => <Post key={content._id} content={content} profileImg={displayImgs.profileImg} setProfile={dispatch} photosCollection={photosCollection} />)
              ) : (
                <div className="nopost">
                  <div className="nopost-no heading-main">No Post</div>
                  <div className="nopost-to"><a href={NEWPOST}>Click Here</a> To Post</div>
                </div>
              )} </>)}
      </TimeLineContext.Provider>
    </>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    date: PropTypes.number,
    email: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    _id: PropTypes.string,
    username: PropTypes.string
  })
};
