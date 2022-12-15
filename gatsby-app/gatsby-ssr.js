import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { isIE } from 'react-device-detect';

import Layout from './src/components/layout/Layout';

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

const HeadComponents = [
    <link
        key="slick.min.css"
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css"
    />,
    <link
        key="slick-theme.min.css"
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css"
    />,
];

export const onRenderBody = ({ setHeadComponents }) => {
    setHeadComponents(HeadComponents);
};
