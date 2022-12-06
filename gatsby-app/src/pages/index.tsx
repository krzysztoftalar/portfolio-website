import { observer } from 'mobx-react';
import React from 'react';

import HomeBanner from '../components/homePage/baner/HomeBanner';
import HomeAbout from '../components/homePage/HomeAbout';
import HomeContent from '../components/homePage/HomeContent';
import HomeFeatured from '../components/homePage/HomeFeatured';
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
