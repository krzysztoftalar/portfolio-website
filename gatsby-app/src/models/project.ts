import { IImage } from './image';
import { ImageDataLike } from 'gatsby-plugin-image';

export interface IProject {
    id: string;
    body: string;
    fields: {
        slug: string;
    };
    frontmatter: {
        category: string;
        title: string;
        subtitle: string;
        year: Date;
        featured: boolean;
        repoLink: string;
        liveLink: string;
        cover: ImageDataLike;
        images: ImageDataLike[];
        metaDescription: string;
    };
}
