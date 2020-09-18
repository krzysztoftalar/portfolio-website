import { DefaultTheme } from 'styled-components';
// Imports from src
import { black, greyDarkColor, greyLightColor, white } from './variables';
import { useStore } from '../../hooks/useStore';

export const darkTheme: DefaultTheme = {
    background: black,
    text: white,
    disabledText: greyDarkColor,
};

export const lightTheme: DefaultTheme = {
    background: white,
    text: black,
    disabledText: greyLightColor,
};

export const getTheme = (): DefaultTheme => {
    const store = useStore();
    const { theme } = store.uiStore;

    switch (theme) {
        case 'dark':
            return darkTheme;

        case 'light':
            return lightTheme;

        default:
            return darkTheme;
    }
};
