import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Image from './image';
import Actions from './actions';
import Footer from './footer';
import Comments from './comments';
import { getuserDisplayImgs } from '../../services/userServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import PayModal from './payModel';

export default function Post({ content, postref, setProfile, photosCollection }) {
  const commentInput = useRef(null);
  const [profileImg, setProfileImg] = useState()
  const [payModel, setPayModel] = useState()
  const handleFocus = () => commentInput.current.focus();

  const { files, caption, author, paid } = content.post

  useEffect(async () => {
    const { displayImg } = await getuserDisplayImgs(author)
    setProfileImg(displayImg.profileImg);
  }, [])

  const handlePay = () => {
    setPayModel(true)
  }

  // const result = caption.charCodeAt(0)
  // console.log(caption, result);
  // components
  // -> header, image, actions (like & comment icons), footer, comments
  return (
    <div ref={postref} className="post">
      <Header content={content.post} username={author} profileImg={profileImg} setProfile={setProfile} photosCollection={photosCollection} />
      {!content.post.paid.isPaid ? (
        <Image files={files} caption={author} />
      ) : (
        content.hasPaid ? (
          <Image files={files} caption={author} />
        ) : (
          <div className="not-paid">
            <FontAwesomeIcon className="not-paid__lock" icon={faLock} />
            <button onClick={handlePay} className="btn btn-login not-paid__price">Pay {paid.price} to See User's Post </button>
            <PayModal onClose={() => setPayModel(false)} open={payModel} />
          </div>
        )
      )
      }

      {/* <Image files={files} caption={content.author} /> */}
      {/* <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      /> */}
      <Footer caption={caption} username={author} />
      {/* <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      /> */}
    </div>
  );
}

Post.propTypes = {
  content: PropTypes.shape({
    author: PropTypes.string.isRequired,
    files: PropTypes.array.isRequired,
    caption: PropTypes.string.isRequired,
    // docId: PropTypes.string.isRequired,
    // userLikedPhoto: PropTypes.bool.isRequired,
    // likes: PropTypes.array.isRequired,
    // comments: PropTypes.array.isRequired,
    date: PropTypes.string.isRequired
  })
};
