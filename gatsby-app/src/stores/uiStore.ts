import { observable, reaction, decorate, action } from 'mobx';
// Imports from src
import RootStore from './rootStore';
import { Cursor } from '../models/cursor';

export default class UIStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        reaction(
            () => this.theme,
            (theme) => {
                if (theme) {
                    window.localStorage.setItem('theme', theme);
                }
            }
        );
    }

    theme: string | null = 'light';
    cursor: Cursor | boolean = false;
    open = false;
    elementPosition: { elX: number; elY: number } = { elX: 0, elY: 0 };

    setTheme = (theme: string): void => {
        this.theme = theme;
    };

    setCursor = (cursor?: Cursor): void => {
        if (cursor) {
            this.cursor = cursor;
        } else {
            this.cursor = false;
        }
    };

    toggleOpen = (): void => {
        this.open = !this.open;
    };

    setElementPosition = (x: number, y: number): void => {
        this.elementPosition.elX = x;
        this.elementPosition.elY = y;
    };
}

decorate(UIStore, {
    theme: observable,
    setTheme: action,
    cursor: observable,
    setCursor: action,
    open: observable,
    toggleOpen: action,
    elementPosition: observable,
    setElementPosition: action,
});
