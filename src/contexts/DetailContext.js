import React, { createContext, useState } from 'react';

// CONTEXT **************** */
export const DetailContext = createContext();

// PROVIDER **************** */
const DetailProvider = ({ children }) => {
  const [detail, setDetail] = useState(null);

  return (
    <DetailContext.Provider value={[detail, setDetail]}>
      {children}
    </DetailContext.Provider>
  );
};

export default DetailProvider;
