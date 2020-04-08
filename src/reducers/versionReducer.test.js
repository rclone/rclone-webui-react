import versionReducer, { initialState } from './versionReducer';
import { GET_VERSION, REQUEST_SUCCESS } from '../actions/types';

describe('Explorer Reducer', function() {
  it('should return default state', function() {
    const newState = versionReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('should return version information', function() {
    const payload = {
      arch: 'amd64',
      decomposed: [1, 50, 2],
      goVersion: 'go1.13.4',
      isGit: false,
      os: 'darwin',
      version: 'v1.50.2',
      hasError: false
    };
    const newState = versionReducer(undefined, {
      type: GET_VERSION,
      status: REQUEST_SUCCESS,
      payload: payload
    });
    expect(newState).toEqual(payload);
  });

});
