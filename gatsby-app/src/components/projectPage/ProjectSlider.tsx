import React from 'react';
import { GatsbyImage, ImageDataLike, getImage } from 'gatsby-plugin-image';
// Imports from src
import { ProjectSliderSection } from '../../styles/pages/projectStyles';
import { sectionVariants } from '../../styles/base/globalVariants';
import { useSectionAnimation } from '../../hooks/useSectionAnimation';
import Carousel from '../ui/Carousel';

interface IProps {
    images: ImageDataLike[];
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
                {images.map((img, index) => {
                    const image = getImage(img);

                    return (
                        <div key={index} className="img-fluid">
                            <GatsbyImage image={image} alt="Project" />
                        </div>
                    );
                })}
            </Carousel>
        </ProjectSliderSection>
    );
};

export default ProjectSlider;
