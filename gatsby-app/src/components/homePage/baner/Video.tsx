import { MotionValue } from 'framer-motion';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import { IFile } from '../../../models/file';
import { VideoWrapper } from '../../../styles/pages/homeStyles';

interface IProps {
    y: MotionValue;
}

const Video: React.FC<IProps> = ({ y }) => {
    const { file }: IFile = useStaticQuery(graphql`
        query {
            file(relativePath: { eq: "banner.mp4" }) {
                publicURL
            }
        }
    `);

    return (
        <VideoWrapper style={{ y }}>
            <video src={file.publicURL} autoPlay muted loop>
                Your browser is not supported!
            </video>
        </VideoWrapper>
    );
};

export default Video;
