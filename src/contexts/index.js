import { createContext } from 'react';
import RootStore from '../stores';

const store = new RootStore();
export const storeContext = createContext(store);
