import { observable, reaction, decorate, action } from 'mobx';
// Imports from src
import RootStore from './rootStore';

const CURSOR_STYLES = ['pointer', 'hovered', 'locked', 'nav-open'];

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

    theme: string | null = 'dark';
    cursorStyles: string[] = CURSOR_STYLES;
    cursor: string | boolean = false;
    open = false;
    elementPosition: { elX: number; elY: number } = { elX: 0, elY: 0 };

    setTheme = (theme: string): void => {
        this.theme = theme;
    };

    setCursor = (cursor?: string): void => {
        if (cursor && this.cursorStyles.includes(cursor)) {
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
