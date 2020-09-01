import React from 'react';
import { observer } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
// Imports from src
import Header from './Header';
import { GlobalStyle, LayoutContainer } from '../styles/globalStyles';
import { getTheme } from '../styles/themes';
import CustomCursor from './CustomCursor';

interface IProps {
    children?: React.ReactNode;
}

const Layout = ({ children }: IProps): JSX.Element => {
    return (
        <ThemeProvider theme={getTheme()}>
            <GlobalStyle />
            <CustomCursor />

            <LayoutContainer>
                <Header />
                {children}
            </LayoutContainer>
        </ThemeProvider>
    );
};

export default observer(Layout);
