import axios from 'axios';
import { API_OPTIONS } from './apiConstants';
import { store } from '../../Store/store';


export const get = endpoint => {
  const state = store.getState();
  const tokenValue = state.data.tokenValue;
  return axios({
    method: 'GET',
    url: endpoint,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenValue}`
    },
  })
    .then(function (res) {
      if (res.status < 200 || res.status > 302) {
        // This will handle any errors that aren't network related (network related errors are handled automatically)
        console.error('An error occurred while making a HTTP request: ', res.error);
        return Promise.reject(new Error('something went wrong'));
      }
      return res.data;
    })
    .catch(function (error) {
      const {
        response: {
          status = 0,
        } = {},
      } = error;
      if (status === 403) {
        return {
          status,
        }
      } else {
        return error;
      }
    });
}

export const post = (endpoint, body) => {
  const state = store.getState();
  const tokenValue = state.data.tokenValue;
  let data = JSON.stringify(body);
  let headers;
  if (endpoint.includes('signin')) {
    headers = API_OPTIONS.headers;
  } else {
    headers = {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${tokenValue}`
    }
  } 
  return axios({
    method: 'POST',
    url: endpoint,
    data: data,
    headers
  })
    .then(function (res) {
      if (res.status === 200 ) {
        return res.data;
        
      } else {
        alert("service fail");
        
      }
    })
    .catch(function (error) {
      throw error;
    });

}
