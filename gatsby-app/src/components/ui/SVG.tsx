import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import { IFile } from '../../models/file';

interface IProps {
    icon: string;
}

const SVG: React.FC<IProps> = ({ icon }): JSX.Element => {
    const { file }: IFile = useStaticQuery(graphql`
        query {
            file(relativePath: { eq: "sprite.svg" }) {
                publicURL
            }
        }
    `);

    return (
        <svg>
            <use xlinkHref={`${file.publicURL}#icon-${icon}`} />
        </svg>
    );
};

export default SVG;
