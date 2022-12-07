import { AppInsightsContext } from '@microsoft/applicationinsights-react-js';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { isIE } from 'react-device-detect';

import Layout from './src/components/layout/Layout';
import { reactPlugin } from './src/services/AppInsightsService';

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
        <AppInsightsContext.Provider value={reactPlugin}>
            <AnimatePresence>
                <Layout {...props} key={props.location.path}>
                    {element}
                </Layout>
            </AnimatePresence>
        </AppInsightsContext.Provider>
    );
};
