import { createContext } from 'react';
import { configure, runInAction } from 'mobx';
// Imports from src
import UIStore from './uiStore';

configure({ enforceActions: 'always' });

export default class RootStore {
    uiStore: UIStore;

    constructor() {
        this.uiStore = new UIStore(this);
    }
}

const rootStore = runInAction(() => {
    return new RootStore();
});

export const RootStoreContext = createContext(rootStore);
