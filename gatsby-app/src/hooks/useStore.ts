import { useContext } from 'react';

import RootStore, { RootStoreContext } from '../stores/rootStore';

export const useStore = (): RootStore => useContext(RootStoreContext);
