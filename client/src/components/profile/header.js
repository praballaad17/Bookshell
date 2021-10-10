/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import { toggleFollow } from '../../services/userServices';
import UserContext from '../../context/user';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';
import PIModal from './pimodal'
import FollowerModal from './followerModal';

export default function Header({
  photosCount,
  followerCount,
  setProfile,
  displayImgs,
  profile: {
    _id: profileUserId,
    fullName,
    followers,
    following,
    username: profileUsername
  }
}) {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.username);
  const [isFollowingProfile, setIsFollowingProfile] = useState(null);
  const [ispiModal, setIspiModal] = useState(false)
  const [isfollowerModal, setIsfollowerModal] = useState(false)
  const [isfollowingModal, setIsfollowingModal] = useState(false)
  // const [profileImg, setProfileImg] = useState();
  const activeBtnFollow = user?.username && user?.username !== profileUsername;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setProfile({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
    });
    await toggleFollow(isFollowingProfile, profileUserId, user._id);
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = () => {
      // const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
      const isFollowing = followers.filter(item => item._id == user._id)
      setIsFollowingProfile(!!isFollowing.length);
    };

    if (user?.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user?.username, profileUserId]);


  return (
    <>
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <div className="container flex justify-center items-center">
          {profileUsername ? (
            <img
              onClick={() => setIspiModal(true)}
              className="rounded-full h-40 w-40 flex"
              alt={`${fullName} profile picture`}
              src={displayImgs ? displayImgs.profileImg : DEFAULT_IMAGE_PATH}
              onError={(e) => {
                e.target.src = DEFAULT_IMAGE_PATH;
              }}
            />
          ) : (
            <Skeleton circle height={150} width={150} count={1} />
          )}
        </div>

        <PIModal setProfile={setProfile} open={ispiModal} user={user} onClose={() => setIspiModal(false)} />

        <div className="flex items-center justify-center flex-col col-span-2">
          <div className="container flex items-center">
            <p className="text-2xl mr-4">{profileUsername}</p>
            {activeBtnFollow && isFollowingProfile === null ? (
              <Skeleton count={1} width={60} height={32} />
            ) : (
              activeBtnFollow && (
                <button
                  className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  type="button"
                  onClick={handleToggleFollow}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleToggleFollow();
                    }
                  }}
                >
                  {isFollowingProfile ? 'Unfollow' : 'Follow'}
                </button>
              )
            )}
          </div>
          <div className="container flex mt-4">
            {!followers || !following ? (
              <Skeleton count={1} width={500} height={24} />
            ) : (
              <>
                <p className="mr-10">
                  <span className="font-bold">{photosCount}</span> photos
                </p>
                <p className="mr-10" onClick={() => setIsfollowerModal(true)}>
                  <span className="font-bold">{followerCount}</span>
                  {` `}
                  {followerCount === 1 ? `follower` : `followers`}
                </p>
                <FollowerModal open={isfollowerModal} user={user} onClose={() => setIsfollowerModal(false)} />
                <p className="mr-10" onClick={() => setIsfollowingModal(true)}>
                  <span className="font-bold">{following?.length}</span> following
                </p>
              </>
            )}
          </div>
          <div className="container mt-4">
            <p className="font-medium">{!fullName ? <Skeleton count={1} height={24} /> : fullName}</p>
          </div>
        </div>
      </div>

    </>
  );
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setProfile: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array
  }).isRequired
};
