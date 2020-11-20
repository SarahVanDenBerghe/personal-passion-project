import { createContext } from 'react';
import axios from "axios";
import { api } from '../utils/api';

const messages = () => {
  axios.get(`${api.MESSAGES}`)
  .then(function (response) {
      // handle success
      console.log(response);
      messages = response;
  })
  .then(function () {
    // always executed
  });
}


export const messagesContext = createContext(messages);