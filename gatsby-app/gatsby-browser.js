import React from 'react';
import { AnimatePresence } from 'framer-motion';
// Imports from src
import Layout from './src/components/layout/Layout';

export const onInitialClientRender = () => {
    window.scrollTo(0, 0);
};

export const wrapPageElement = ({ element, props }) => {
    return (
        <AnimatePresence>
            <Layout {...props} key={props.location.path}>
                {element}
            </Layout>
        </AnimatePresence>
    );
};
