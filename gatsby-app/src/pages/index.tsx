import React from 'react';
import { observer } from 'mobx-react';
// Imports from src
import HomeBanner from '../components/homePage/Baner/HomeBanner';
import HomeContent from '../components/homePage/HomeContent';
import HomeFeatured from '../components/homePage/HomeFeatured';
import HomeAbout from '../components/homePage/HomeAbout';
import Footer from '../components/layout/Footer';
import PageLayout from '../components/layout/PageLayout';
import SEO from '../components/ui/SEO';

const IndexPage = (): JSX.Element => {
    return (
        <PageLayout>
            <SEO />
            <HomeBanner />
            <HomeContent />
            <HomeFeatured />
            <HomeAbout />
            <Footer />
        </PageLayout>
    );
};

export default observer(IndexPage);
