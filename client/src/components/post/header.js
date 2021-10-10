/* eslint-disable jsx-a11y/img-redundant-alt */
import { faEllipsisV, faHamburger } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';
import { deletePostById } from '../../services/postServices';
import PostModal from './postModal';

export default function Header({ username, profileImg, content, setProfile, photosCollection }) {
  const [isModal, setModal] = useState(false)

  return (
    <div className="post__header">

      <Link to={`/user/${username}`} className="flex items-center">
        <img
          className="post__header--img"
          src={profileImg ? profileImg : DEFAULT_IMAGE_PATH}
          alt={`${username} profile picture`}
        />
        <p className="font-bold">{username}</p>
      </Link>
      <div onClick={() => setModal(true)}><FontAwesomeIcon icon={faEllipsisV} /></div>
      <PostModal content={content} open={isModal} onClose={() => setModal(false)} setProfile={setProfile} photosCollection={photosCollection} />
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired
};
