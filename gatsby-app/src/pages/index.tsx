import React from 'react';
import { observer } from 'mobx-react';
// Imports from src
import HomeBanner from '../components/homePage/HomeBanner';
import HomeContent from '../components/homePage/HomeContent';
import HomeFeatured from '../components/homePage/HomeFeatured';
import HomeAbout from '../components/homePage/HomeAbout';
import Footer from '../components/layout/Footer';

const IndexPage = (): JSX.Element => {
    return (
        <>
            <HomeBanner />
            <HomeContent />
            <HomeFeatured />
            <HomeAbout />
            <Footer />
        </>
    );
};

export default observer(IndexPage);
