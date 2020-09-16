import React from 'react';
// Imports from src
import CustomCursor from '../ui/CustomCursor';
import Navigation from './Navigation';
import Header from './Header';
import { LayoutContainer } from '../../styles/base/globalStyles';

interface Props {
    children: React.ReactNode;
}

const PageLayout: React.FC<Props> = ({ children }): JSX.Element => {
    return (
        <>
            <CustomCursor />

            <Navigation />

            <LayoutContainer>
                <Header />
                {children}
            </LayoutContainer>
        </>
    );
};

export default PageLayout;
