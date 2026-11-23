import {useEffect, useState} from 'react';
import {fetchData} from '../utils/fetchdata';

const MEDIA_API = import.meta.env.VITE_MEDIA_API;
const AUTH_API = import.meta.env.VITE_AUTH_API;
const UPLOAD_API = import.meta.env.VITE_UPLOAD_SERVER;

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  useEffect(() => {
    try {
      const getMedia = async () => {
        const mediaFiles = await fetchData(MEDIA_API + '/media'); //?limit=10');

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

  const postMedia = async (file, inputs, token) => {
    const mediaData = {
      title: inputs.title,
      description: inputs.description,
      filename: file.filename,
      media_type: file.media_type,
      filesize: file.filesize,
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(mediaData),
    };

    const mediaResponse = await fetchData(MEDIA_API + '/media', fetchOptions);
    return mediaResponse;
  };

  return {mediaArray, postMedia};
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

const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);

    const fetchOptions = {
      method: 'POST',
      headers: {Authorization: 'Bearer ' + token},
      body: formData,
    };

    const fileData = await fetchData(UPLOAD_API + '/upload', fetchOptions);

    return fileData;
  };

  return {postFile};
};

export {useMedia, useUser, useAuthentication, useFile};
