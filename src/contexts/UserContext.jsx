import {createContext, useState} from 'react';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {useLocation, useNavigate} from 'react-router';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const postLogin = useAuthentication();
  const {getUserByToken} = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (credentials) => {
    try {
      const userData = await postLogin(credentials);
      console.log('UserContext handleLogin', userData);
      localStorage.setItem('token', userData.token);
      setUser(userData.user);
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.clear();
      setUser(null);
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleAutoLogin = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('no token found');
      return;
    }
    try {
      const userData = await getUserByToken(token);
      console.log('UserContext handleAutoLogin userData', userData);
      setUser(userData);

      // console.log('location', location, user, userData);
      navigate(location.pathname);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <UserContext.Provider
      value={{user, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export {UserProvider, UserContext};
