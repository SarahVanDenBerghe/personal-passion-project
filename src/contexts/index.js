import { createContext } from 'react';
import RootStore from '../stores';
import BaublesStore from '../stores/BaublesStore';
import TreeStore from '../stores/TreeStore';

const store = new RootStore();
const baublesStore = new BaublesStore();
const treeStore = new TreeStore();

export const baublesStoreContext = createContext(baublesStore);
export const treeStoreContext = createContext(treeStore);

export const storeContext = createContext(store);
