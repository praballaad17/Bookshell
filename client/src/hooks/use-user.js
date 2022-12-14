import { useState, useEffect } from 'react';
import { getUserByUsername, getuserDisplayImgs } from '../services/userServices';

export default function useUser(username) {
  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    async function getUserObjByUserId(username) {
      const user = await getUserByUsername(username);
      const images = await getuserDisplayImgs(username);


      setActiveUser({ ...user, displayImg: images?.displayImg } || {});
    }

    if (username) {
      getUserObjByUserId(username);
    }
  }, [username]);

  return { user: activeUser, setActiveUser };
}
