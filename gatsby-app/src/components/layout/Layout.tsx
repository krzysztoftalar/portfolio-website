import React, { useEffect } from 'react';
import { PageProps } from 'gatsby';
import { observer } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
// Imports from src
import { GlobalStyle } from '../../styles/base/globalStyles';
import { getTheme } from '../../styles/base/themes';
import { useStore } from '../../hooks/useStore';
import '../../styles/base/base.css';
import Navigation from './Navigation';

const Layout = (props: PageProps): JSX.Element => {
    const store = useStore();
    const { setCursor, setTheme } = store.uiStore;

    useEffect(() => {
        setCursor();
    }, [props.location.pathname]);

    useEffect(() => {
        const theme = window.localStorage.getItem('theme');

        if (theme) {
            setTheme(theme);
        }
    }, [setTheme]);

    return (
        <ThemeProvider theme={getTheme()}>
            <GlobalStyle />

            <Navigation />

            {props.children}
        </ThemeProvider>
    );
};

export default observer(Layout);
