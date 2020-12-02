import { storeContext } from '../contexts';
import { useContext } from 'react';

export const useStore = () => useContext(storeContext);
