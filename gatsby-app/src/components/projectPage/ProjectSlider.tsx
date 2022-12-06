import { GatsbyImage, ImageDataLike, getImage } from 'gatsby-plugin-image';
import React from 'react';

import { useSectionAnimation } from '../../hooks/useSectionAnimation';
import { sectionVariants } from '../../styles/base/globalVariants';
import { ProjectSliderSection } from '../../styles/pages/projectStyles';
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
                            {image && (
                                <GatsbyImage image={image} alt="Project" />
                            )}
                        </div>
                    );
                })}
            </Carousel>
        </ProjectSliderSection>
    );
};

export default ProjectSlider;
