import React, { useEffect } from 'react';
import { PageProps } from 'gatsby';
import { observer } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
// Imports from src
import { GlobalStyle } from '../../styles/base/globalStyles';
import { useStore } from '../../hooks/useStore';
import '../../styles/base/base.css';
import Navigation from './Navigation';
import { useDarkMode } from '../../hooks/useDarkMode';

const Layout = (props: PageProps): JSX.Element => {
    const store = useStore();
    const { setCursor } = store.uiStore;

    const { themeMode } = useDarkMode();

    useEffect(() => {
        setCursor();
    }, [props.location.pathname]);

    return (
        <ThemeProvider theme={themeMode}>
            <GlobalStyle />

            <Navigation />

            {props.children}
        </ThemeProvider>
    );
};

export default observer(Layout);
