import fetch from 'isomorphic-fetch';

const request = async (path, method, data = null) => {
  fetch(path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'jwt-token': '',
    },
    
  });
};

export default request;
