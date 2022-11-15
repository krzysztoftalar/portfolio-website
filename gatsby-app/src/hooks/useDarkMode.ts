import { useEffect } from 'react';
import { DefaultTheme } from 'styled-components';
// Imports from src
import { useStore } from './useStore';
import { darkTheme, lightTheme } from '../styles/base/themes';
import { DARK_THEME_KEY, LIGHT_THEME_KEY, THEME_KEY } from '../utils/constants';

export const useDarkMode = (): {
    toggleTheme: () => void;
    themeMode: DefaultTheme;
} => {
    const store = useStore();
    const { theme, setTheme } = store.uiStore;

    const toggleTheme = () => {
        if (theme === DARK_THEME_KEY) {
            setTheme(LIGHT_THEME_KEY);
        } else {
            setTheme(DARK_THEME_KEY);
        }
    };

    const themeMode = theme === DARK_THEME_KEY ? darkTheme : lightTheme;

    useEffect(() => {
        const theme = window.localStorage.getItem(THEME_KEY);

        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches &&
        !theme
            ? setTheme(DARK_THEME_KEY)
            : theme
            ? setTheme(theme)
            : setTheme(LIGHT_THEME_KEY);
    }, [setTheme]);

    return { toggleTheme, themeMode };
};
