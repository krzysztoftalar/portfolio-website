import React from 'react';

import Header from './Header';

import { LayoutContainer } from '../../styles/base/globalStyles';
import CustomCursor from '../ui/CustomCursor';

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
