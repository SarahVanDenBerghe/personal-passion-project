import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
// https://www.youtube.com/watch?v=35lXWvCuM8o

// CONTEXT **************** */
export const BaublesContext = createContext();

// PROVIDER **************** */
const api = axios.create({
  baseURL: `${process.env.REACT_APP_STRAPI_API}?_limit=-1`,
});

const BaublesProvider = ({children}) => {
  const [baubles, setBaubles] = useState([]);

  useEffect(() => {
    api.get('').then((response) => {
      setBaubles(response.data);
    });
  },[setBaubles]);

  return (
    <BaublesContext.Provider value={[baubles, setBaubles]}>
      {children}
    </BaublesContext.Provider>
  );
}

export default BaublesProvider;