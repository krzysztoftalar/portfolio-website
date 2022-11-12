import { Node } from 'gatsby';
import { IGatsbyImageDataParent } from 'gatsby-plugin-image/dist/src/components/hooks';
import { IGatsbyImageData } from 'gatsby-plugin-image';

/*export interface IChildImageSharp {
    childImageSharp: {
        fluid: ImageSharpFluid & { originalImg: string };
    };
}*/

// export type ImageSharpFluid = FluidObject | FluidObject[];

// export type ImageSharpFixed = FixedObject | FixedObject[];

export interface IImage {
    childImageSharp?: IGatsbyImageDataParent<Partial<Node>> & {
        gatsbyImageData: IGatsbyImageData;
    };
}
