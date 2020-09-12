import React from 'react';
import Helmet from 'react-helmet';
import Slider from 'react-slick';
// Imports from src
import './carousel.css';

const settings = {
    autoplay: true,
    autoplaySpeed: 10000,
    speed: 500,
    infinite: true,
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
};

interface Props {
    children: React.ReactNode;
}

const Carousel: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Helmet>
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
            </Helmet>
            <Slider {...settings}>{children}</Slider>
        </>
    );
};

export default Carousel;
