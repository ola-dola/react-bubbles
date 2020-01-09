import axios from 'axios';

export default function axiosWithAuth() {
  const token = localStorage.getItem('token');

  return axios.create({
    headers: {
      'content-type': 'application/json',
      'Authorization': token
    }
  })
}