import axiosInstance from '../utils/API/API';
import urls from '../utils/API/endpoint';
import { GET_VERSION, REQUEST_SUCCESS, REQUEST_ERROR } from './types';

export const getVersion = () => {
  return dispatch => {
    axiosInstance.post(urls.getRcloneVersion).then(
      res =>
        dispatch({
          type: GET_VERSION,
          status: REQUEST_SUCCESS,
          payload: res.data
        }),
      error =>
        dispatch({
          type: GET_VERSION,
          status: REQUEST_ERROR,
          payload: error
        })
    );
  };
};
