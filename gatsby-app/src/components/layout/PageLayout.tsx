import React from 'react';

import Header from './Header';

import { LayoutContainer } from '../../styles/base/globalStyles';
import CustomCursor from '../ui/CustomCursor';

interface IProps {
    children: React.ReactNode;
}

const PageLayout: React.FC<IProps> = ({ children }): JSX.Element => {
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
