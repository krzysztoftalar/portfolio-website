import { DefaultTheme } from 'styled-components';

import { black, greyDarkColor, greyLightColor, white } from './variables';

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
