import { FixedObject, FluidObject } from 'gatsby-image';

export interface IChildImageSharp {
    childImageSharp: {
        fluid: ImageSharpFluid & { originalImg: string };
    };
}

export type ImageSharpFluid = FluidObject | FluidObject[];

export type ImageSharpFixed = FixedObject | FixedObject[];
