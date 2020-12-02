import { createContext } from 'react';
import BaublesStore from '../stores/BaublesStore';
import TreeStore from '../stores/TreeStore';

const baublesStore = new BaublesStore();
const treeStore = new TreeStore();

export const baublesStoreContext = createContext(baublesStore);
export const treeStoreContext = createContext(treeStore);
