import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';

const Profile = () => {
  const [user, setUser] = useState({});
  const {getUserByToken} = useUser();

  useEffect(() => {
    const getUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('token not found');
        return;
      }

      try {
        const user = await getUserByToken(token);
        console.log('profile user', user);
        setUser(user);
      } catch (error) {
        console.error(error.message);
      }
    };
    getUserInfo();
  }, []);

  return (
    <>
      <h2>{user.username}</h2>
      <ul>
        <li>Registered: {user.created_at}</li>
        <li>Email: {user.email}</li>
        <li>User level: {user.level_name}</li>
        <li>User id: {user.user_id}</li>
      </ul>
    </>
  );
};

export default Profile;
