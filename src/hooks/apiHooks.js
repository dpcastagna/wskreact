import {useEffect, useState} from 'react';
import {fetchData} from '../utils/fetchdata';

const MEDIA_API = import.meta.env.VITE_MEDIA_API + '/media';
const AUTH_API = import.meta.env.VITE_AUTH_API + '/users';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  useEffect(() => {
    try {
      const getMedia = async () => {
        const mediaFiles = await fetchData(MEDIA_API);

        const mediaFilesWithUsernames = await Promise.all(
          mediaFiles.map(async (item) => {
            const result = await fetchData(`${AUTH_API}/${item.user_id}`);
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
    const user = await fetchData(`${AUTH_API}/${userId}`);
    return user;
  };

  return {getUserInformation};
};

export {useMedia, useUser};
