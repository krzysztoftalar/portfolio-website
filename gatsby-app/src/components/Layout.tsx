import React from 'react';
import { observer } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
// Imports from src
import Header from './Header';
import Navigation from './Navigation';
import CustomCursor from './CustomCursor';
import { GlobalStyle, LayoutContainer } from '../styles/globalStyles';
import { getTheme } from '../styles/themes';

interface IProps {
    children?: React.ReactNode;
}

const Layout = ({ children }: IProps): JSX.Element => {
    return (
        <ThemeProvider theme={getTheme()}>
            <GlobalStyle />
            <CustomCursor />

            <Navigation />

            <LayoutContainer>
                <Header />
                {children}
            </LayoutContainer>
        </ThemeProvider>
    );
};

export default observer(Layout);
