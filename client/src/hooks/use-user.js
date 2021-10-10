import { useState, useEffect } from 'react';
import { getUserByUsername, getusersFollowers, getusersFollowing, getuserDisplayImgs } from '../services/userServices';

export default function useUser(username) {
  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    async function getUserObjByUserId(username) {
      const user = await getUserByUsername(username);
      const followers = await getusersFollowers(username);
      const following = await getusersFollowing(username);
      const { displayImg } = await getuserDisplayImgs(username);
      console.log(displayImg);
      setActiveUser({ ...user, followers: followers, following: following, displayImg: displayImg } || {});
    }

    if (username) {
      getUserObjByUserId(username);
    }
  }, [username]);
  console.log(activeUser);
  return { user: activeUser, setActiveUser };
}
