import axios from 'axios';

// Constants

export const FETCH_POSTS = 'FETCH_POSTS';
const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
import API_KEY from '../../global';

// action creators

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY.POST_KEY}`);
  return {
    type: FETCH_POSTS,
    payload: request
  };
}
