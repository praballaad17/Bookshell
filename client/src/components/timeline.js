import { faArrowLeft, faBackward, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useContext, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import TimeLineContext from '../context/timeline';
import LoggedInUserContext from '../context/logged-in-user';
import usePhotos from '../hooks/use-photos';
import SearchBar from './leftbar/searchBar';
import Post from './post';

export default function Timeline() {
  const { user } = useContext(LoggedInUserContext);
  const [pageNumber, setPageNumber] = useState(1)
  const [searchToggle, setSearchToggle] = useState(false)

  const { posts, loading, hasMore, error, setPosts } = usePhotos(user, pageNumber);
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


  return (
    <TimeLineContext.Provider value={{ user, posts, setPosts }}>
      <div className="container col-span-2">
        <div className="timeline__head">
          {!searchToggle && <h3 className="heading-main">Home</h3>}
          {searchToggle && <div className="timeline__head--search">
            <FontAwesomeIcon icon={faArrowLeft} onClick={() => { setSearchToggle(false) }} />
            <SearchBar />
          </div>}
          <div className="timeline__head--searchbtn">
            <FontAwesomeIcon icon={faSearch} onClick={() => setSearchToggle(true)} />
          </div>
        </div>
        {!posts ? (
          <Skeleton count={4} width={640} height={500} className="mb-5" />
        ) : (
          posts.map((content, index) => {
            if (posts.length === index + 1) {
              return <Post postref={lastPostRef} key={content?.post._id} content={content} />
            }
            else {
              return <Post key={content?.post._id} content={content} />
            }
          })
        )}
        <div>{loading && (
          <Skeleton count={4} width={640} height={500} className="mb-5" />
        )}</div>
        <div>{error && 'Error'}</div>
      </div>
    </TimeLineContext.Provider >
  );
}
