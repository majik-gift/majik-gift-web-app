// lib/useFCM.js
'use client';

import { getTokenFromFCM } from '@/lib/fcmHelpers';
import axiosInstance from '@/shared/services/axiosInstance';
import { messaging } from '@/shared/services/firebase';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useFCM = () => {
  const { user } = useSelector((state) => state.appReducer);

  useEffect(() => {
    const handleFCMToken = async () => {
      try {
        const alreadyHaveToken = localStorage.getItem('device_token');
        const { token, shouldUpdateToken } = await getTokenFromFCM(alreadyHaveToken, messaging);
        // console.log("TCL: handleFCMToken -> token", token)
        // Case 1: User grants permission, old token exists, update the token
        // if (shouldUpdateToken) {
        //   if (alreadyHaveToken) {
        //     await axiosInstance.post('users/remove-device-token', {
        //       deviceToken: alreadyHaveToken,
        //     });
        //     localStorage.removeItem('device_token');
        //   }

        //   if (token) {
        //     await axiosInstance.post('users/add-device-token', {
        //       deviceToken: token,
        //     });
        //     localStorage.setItem('device_token', token);
        //   }
        // }

        // // Case 2: User denies permission, remove existing token if present
        // if (!token && alreadyHaveToken && !shouldUpdateToken) {
        //   await axiosInstance.post('users/remove-device-token', {
        //     deviceToken: alreadyHaveToken,
        //   });
        //   localStorage.removeItem('device_token');
        // }

        if (token) {
          await axiosInstance.post('users/add-device-token', {
            deviceToken: token,
          });
          localStorage.setItem('device_token', token);
        }
      } catch (error) {
        console.error('Error handling FCM:', error);
      }
    };

    if (messaging && user) handleFCMToken();
  }, [user]);
};

export default useFCM;
