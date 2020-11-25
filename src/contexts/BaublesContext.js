import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// CONTEXT **************** */
export const BaublesContext = createContext();

// PROVIDER **************** */
const api = axios.create({
  baseURL: `${process.env.REACT_APP_STRAPI_API}/messages?_limit=-1`,
});

const BaublesProvider = ({children}) => {
  const [baubles, setBaubles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('').then((response) => {
      console.log("a");
      setBaubles(response.data);
      setLoading(true);
    });
  }, [setBaubles]);

  return (
    <BaublesContext.Provider value={[baubles, setBaubles]}>
      {children}
    </BaublesContext.Provider>
  );
}

export default BaublesProvider;