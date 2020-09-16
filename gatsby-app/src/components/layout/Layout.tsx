import React, { useEffect } from 'react';
import { PageProps } from 'gatsby';
import { observer } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
// Imports from src
import { GlobalStyle } from '../../styles/base/globalStyles';
import { getTheme } from '../../styles/base/themes';
import { useStore } from '../../hooks/useStore';
import '../../styles/base/base.css';

const Layout = (props: PageProps): JSX.Element => {
    const store = useStore();
    const { setTheme, setCursor } = store.uiStore;

    useEffect(() => {
        const theme = window.localStorage.getItem('theme');

        if (theme) {
            setTheme(theme);
        }
    }, []);

    useEffect(() => {
        setCursor();
    }, [props.location.pathname]);

    return (
        <ThemeProvider theme={getTheme()}>
            <GlobalStyle />

            {props.children}
        </ThemeProvider>
    );
};

export default observer(Layout);
