import { IChildImageSharp } from './image';

export interface IProject {
    id: string;
    body: string;
    slug: string;
    frontmatter: {
        category: string;
        title: string;
        subtitle: string;
        year: Date;
        featured: boolean;
        repoLink: string;
        liveLink: string;
        cover: IChildImageSharp;
        images: IChildImageSharp[];
        metaDescription: string;
    };
}
