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
      setBaubles(response.data);
      setLoading(false);
    });
  }, [setBaubles]);

  return (
    <BaublesContext.Provider value={[baubles, setBaubles, loading]}>
      {children}
    </BaublesContext.Provider>
  );
}

export default BaublesProvider;