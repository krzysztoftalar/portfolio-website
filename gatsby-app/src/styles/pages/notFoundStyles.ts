import styled from 'styled-components';
// Imports from src
import background from '../../assets/images/not-found-bg.jpg';
import { black, white } from '../base/variables';
import { respondTo } from '../base/responsive';

export const NotFoundWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    background-image: url(${background});
    background-size: cover;
    text-align: center;

    .content {
        padding: 5rem 3rem;
        flex: 0 0 60%;
    }

    h1 {
        margin: 0;
        color: ${black};
        font-size: 20rem;
        font-weight: 900;
    }

    h2 {
        color: ${white};
        font-size: 5rem;
    }

    h3 {
        color: ${white};
        font-size: 3rem;
        font-weight: 600;
        line-height: 1.4;
    }

    .cursor {
        position: fixed;
        top: 50vh;
        left: 70vw;
        width: 20rem;
        height: 20rem;
        margin: -15rem 0 0 -15rem;
        will-change: top, left;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.1);
        box-shadow: 0 0 0 9999rem rgba(0, 0, 0, 0.97);

        &:after {
            content: '';
            display: block;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: inset 0 0 40px 2px rgb(0, 0, 0),
                0 0 20px 4px rgba(13, 13, 10, 0.2);
        }
    }

    @media ${respondTo.M} {
        h1 {
            font-size: 16rem;
        }

        h2 {
            font-size: 4rem;
        }

        h3 {
            font-size: 2rem;
        }
    }

    @media ${respondTo.S} {
        h1 {
            font-size: 12rem;
        }

        h2 {
            font-size: 3rem;
        }

        h3 {
            font-size: 1.6rem;
        }
    }
`;
