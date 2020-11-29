import { createContext } from 'react';
import BaublesStore from '../stores/BaublesStore';

const baublesStore = new BaublesStore();
export const baublesStoreContext = createContext(baublesStore);
