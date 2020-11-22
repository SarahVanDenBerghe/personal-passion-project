import React, { createContext, useState } from 'react';
import { VIEWS } from '../consts/views';

// CONTEXT **************** */
export const ViewContext = createContext();

// PROVIDER **************** */
const ViewProvider = ({ children }) => {
  const [view, setView] = useState(VIEWS.default);

  return (
    <ViewContext.Provider value={[view, setView]}>
      {children}
    </ViewContext.Provider>
  );
};

export default ViewProvider;