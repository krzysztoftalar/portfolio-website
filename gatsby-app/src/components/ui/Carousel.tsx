import React from 'react';
import Slider, { Settings } from 'react-slick';

import '../../styles/components/carousel.css';

const settings: Settings = {
    autoplay: true,
    autoplaySpeed: 10000,
    speed: 500,
    infinite: true,
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
};

interface IProps {
    children: React.ReactNode;
}

const Carousel: React.FC<IProps> = ({ children }) => {
    return <Slider {...settings}>{children}</Slider>;
};

export default Carousel;
