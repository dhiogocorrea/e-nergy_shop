import axios from 'axios';

const URL_ROOT = 'http://192.168.15.7:8000';
export const get = (state, city, kwp) => {
  const url = URL_ROOT + `/suppliers?state=${state}&city=${city}&kwp=${kwp}`;
  console.log(url);
  return axios({
    method: 'get',
    url: url,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
