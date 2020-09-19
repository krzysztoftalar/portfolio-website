import React from 'react';
import Image from 'gatsby-image';
// Imports from src
import { ProjectSliderSection } from '../../styles/pages/projectStyles';
import { sectionVariants } from '../../styles/base/globalVariants';
import { IChildImageSharp } from '../../models/image';
import { useSectionAnimation } from '../../hooks/useSectionAnimation';
import Carousel from '../ui/Carousel';

interface IProps {
    images: IChildImageSharp[];
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
