import React from 'react';
import { observer } from 'mobx-react';
// Imports from src
import Layout from '../components/Layout';
import HomeBanner from '../components/homePage/HomeBanner';
import HomeContent from '../components/homePage/HomeContent';
import HomeFeatured from '../components/homePage/HomeFeatured';

const IndexPage = (): JSX.Element => {
    return (
        <Layout>
            <HomeBanner />
            <HomeContent />
            <HomeFeatured />
        </Layout>
    );
};

export default observer(IndexPage);
