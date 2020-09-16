import React, { MutableRefObject, useRef } from 'react';
import Image from 'gatsby-image';
import Loadable from '@loadable/component';
// Imports from src
import { ProjectSliderSection } from '../../styles/pages/projectStyles';
import { sectionVariants } from '../../styles/base/globalVariants';
import { IFluidImage } from '../../models/image';
import { useSectionAnimation } from '../../hooks/useSectionAnimation';
import useDimensions from '../../hooks/useDimensions';
import Carousel from '../ui/Carousel';

// const Carousel = Loadable(() => import('../ui/carousel/Carousel'));

interface IProps {
    images: IFluidImage[];
}

const ProjectSlider: React.FC<IProps> = ({ images }: IProps): JSX.Element => {
    const { ref, animation } = useSectionAnimation();

    return (
        <ProjectSliderSection
            ref={ref}
            initial="initial"
            animate={animation}
            variants={sectionVariants}
        >
            <Carousel>
                {images.map((img, index) => (
                    <div key={index} className="img-fluid">
                        <Image fluid={img.childImageSharp.fluid} />
                    </div>
                ))}
            </Carousel>
        </ProjectSliderSection>
    );
};

export default ProjectSlider;
