import { baublesStoreContext } from '../contexts';
import { useContext } from 'react';

export const useBaublesStore = () => useContext(baublesStoreContext);
