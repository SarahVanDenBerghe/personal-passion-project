import { baublesStoreContext, treeStoreContext } from '../contexts';
import { useContext } from 'react';

export const useBaublesStore = () => useContext(baublesStoreContext);
export const useTreeStore = () => useContext(treeStoreContext);
