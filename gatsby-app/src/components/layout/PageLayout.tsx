import React from 'react';
// Imports from src
import CustomCursor from '../ui/CustomCursor';
import Header from './Header';
import { LayoutContainer } from '../../styles/base/globalStyles';

interface Props {
    children: React.ReactNode;
}

const PageLayout: React.FC<Props> = ({ children }): JSX.Element => {
    return (
        <>
            <CustomCursor />

            <LayoutContainer>
                <Header />
                {children}
            </LayoutContainer>
        </>
    );
};

export default PageLayout;
