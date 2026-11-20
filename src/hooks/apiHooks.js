import {useEffect, useState} from 'react';
import {fetchData} from '../utils/fetchdata';

const MEDIA_API = import.meta.env.VITE_MEDIA_API;
const AUTH_API = import.meta.env.VITE_AUTH_API;

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  useEffect(() => {
    try {
      const getMedia = async () => {
        const mediaFiles = await fetchData(MEDIA_API + '/media?limit=10');

        const mediaFilesWithUsernames = await Promise.all(
          mediaFiles.map(async (item) => {
            const result = await fetchData(`${AUTH_API}/users/${item.user_id}`);
            return {...item, username: result.username};
          }),
        );

        setMediaArray(mediaFilesWithUsernames);
      };
      getMedia();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {mediaArray};
};

const useUser = () => {
  const getUserInformation = async (userId) => {
    const user = await fetchData(`${AUTH_API}/users/${userId}`);
    return user;
  };

  const getUserByToken = async (token) => {
    const result = await fetchData(`${AUTH_API}/users/token`, {
      headers: {Authorization: 'Bearer ' + token},
    });
    return result.user;
  };

  const postRegistration = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    const registrationResult = await fetchData(
      `${AUTH_API}/users`,
      fetchOptions,
    );
    return registrationResult;
  };

  return {getUserInformation, getUserByToken, postRegistration};
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions,
    );
    return loginResult;
  };

  return postLogin;
};

export {useMedia, useUser, useAuthentication};
