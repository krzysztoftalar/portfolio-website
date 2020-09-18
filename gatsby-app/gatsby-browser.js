import React from 'react';
import { isIE } from 'react-device-detect';
import { AnimatePresence } from 'framer-motion';
// Imports from src
import Layout from './src/components/layout/Layout';

export const onInitialClientRender = () => {
    window.scrollTo(0, 0);
};

export const wrapPageElement = ({ element, props }) => {
    if (isIE) {
        return (
            <h1>
                Your browser does not support the technologies used on this
                website. Please use a different browser.
            </h1>
        );
    }

    return (
        <AnimatePresence>
            <Layout {...props} key={props.location.path}>
                {element}
            </Layout>
        </AnimatePresence>
    );
};
