import { useContext } from 'react';
// Imports from src
import RootStore, { RootStoreContext } from '../stores/rootStore';

export const useStore = (): RootStore => useContext(RootStoreContext);
