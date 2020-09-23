import { useEffect } from 'react';
import { DefaultTheme } from 'styled-components';
// Imports from src
import { useStore } from './useStore';
import { darkTheme, lightTheme } from '../styles/base/themes';

export const useDarkMode = (): {
    toggleTheme: () => void;
    themeMode: DefaultTheme;
} => {
    const store = useStore();
    const { theme, setTheme } = store.uiStore;

    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    const themeMode = theme === 'dark' ? darkTheme : lightTheme;

    useEffect(() => {
        const theme = window.localStorage.getItem('theme');

        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches &&
        !theme
            ? setTheme('dark')
            : theme
            ? setTheme(theme)
            : setTheme('light');
    }, [setTheme]);

    return { toggleTheme, themeMode };
};
