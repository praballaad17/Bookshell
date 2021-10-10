import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function Footer({ caption, username }) {
  const [newCap, setNewCap] = useState("")
  useEffect(() => {
    setNewCap(caption.replace('\n', '\r'))
  }, [caption])
  return (
    <div className="post__footer">
      <span className="post__footer--name">{username}</span>
      <span className="post__footer--caption">{newCap}</span>
    </div>
  );
}

Footer.propTypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};
