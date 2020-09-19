import React from 'react';
// Imports from src
import { Headline, Title } from '../../../styles/pages/homeStyles';

const BannerTitle = (): JSX.Element => {
    return (
        <Title initial="initial" animate="animate">
            {headline.map((item) => (
                <Headline
                    key={item.id}
                    custom={item.id}
                    variants={headlineVariants}
                >
                    {item.text}
                </Headline>
            ))}
        </Title>
    );
};

export default BannerTitle;

const headline = [
    {
        id: 0,
        text: 'In',
    },
    {
        id: 1,
        text: 'Code',
    },
    {
        id: 2,
        text: 'We',
    },
    {
        id: 3,
        text: 'Trust',
    },
];

const headlineVariants = {
    initial: {
        y: '80rem',
    },
    animate: (custom: number) => ({
        y: 0,
        transition: {
            duration: 1,
            ease: [0.6, 0.05, -0.01, 0.9],
            delay: custom * 0.2,
        },
    }),
};
