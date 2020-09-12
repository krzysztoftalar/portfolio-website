import { ImageSharpFluid } from '../helpers/types';

export interface IFluidImage {
    childImageSharp: {
        fluid: ImageSharpFluid;
    };
}
