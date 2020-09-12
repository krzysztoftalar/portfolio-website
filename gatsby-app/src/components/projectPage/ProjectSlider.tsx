import React, { useEffect } from 'react';
import Image from 'gatsby-image';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Loadable from '@loadable/component';
// Imports from src
import { ProjectSliderSection } from '../../styles/pages/projectStyles';
import { sectionVariants } from '../../styles/base/globalVariants';
import { IFluidImage } from '../../models/image';
const Carousel = Loadable(() => import('../ui/carousel/Carousel'));

interface IProps {
    images: IFluidImage[];
}

const ProjectSlider: React.FC<IProps> = ({ images }: IProps): JSX.Element => {
    const animation = useAnimation();
    const [sliderRef, inView] = useInView({
        triggerOnce: true,
        rootMargin: '-200px',
    });

    useEffect(() => {
        if (inView) {
            animation.start('animate');
        }
    }, [animation, inView]);

    return (
        <ProjectSliderSection
            ref={sliderRef}
            initial="initial"
            animate={animation}
            variants={sectionVariants}
        >
            <Carousel>
                {images.map((img, index) => (
                    <div key={index}>
                        <Image fluid={img.childImageSharp.fluid} />
                    </div>
                ))}
            </Carousel>
        </ProjectSliderSection>
    );
};

export default ProjectSlider;
