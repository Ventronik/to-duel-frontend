import axios from 'axios';

const request = (path, method = 'get', body = null) => {
  let bearerToken = '';
  const token = localStorage.getItem('token');
  if (token) {
    bearerToken = `Bearer ${token}`
  }

  return axios(`${process.env.REACT_APP_BACKEND}${path}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': bearerToken
    },
    data: body
  });
};

export default request;
