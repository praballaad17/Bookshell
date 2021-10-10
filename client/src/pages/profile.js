import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getusersFollowing, getusersFollowers, getUserByUsername } from '../services/userServices'
import * as ROUTES from '../constants/routes';
import Header from '../components/header';
import UserProfile from '../components/profile';

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {

    async function checkUserExists() {
      const user = await getUserByUsername(username);
      const followers = await getusersFollowers(username);
      const following = await getusersFollowing(username);
      if (user?._id) {
        setUser({ ...user, followers: followers, following: following });

      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
  }, [username, history]);

  return user?.username ? (
    <div className="bg-gray-background">
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
}
