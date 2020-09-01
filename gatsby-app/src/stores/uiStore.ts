import { observable, reaction, decorate, action } from 'mobx';
// Imports from src
import RootStore from './rootStore';

const cursorStyles = ['pointer', 'hovered', 'locked'];

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

    theme: string | null =
        window.localStorage.getItem('theme') === null
            ? 'dark'
            : window.localStorage.getItem('theme');

    cursorStyles: string[] = cursorStyles;
    cursor: string | boolean = false;

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
}

decorate(UIStore, {
    theme: observable,
    setTheme: action,
    cursor: observable,
    setCursor: action,
});
