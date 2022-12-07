import { PageProps } from 'gatsby';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import Navigation from './Navigation';
import '../../styles/base/base.css';

import { useDarkMode } from '../../hooks/useDarkMode';
import { useStore } from '../../hooks/useStore';
import { GlobalStyle } from '../../styles/base/globalStyles';

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
