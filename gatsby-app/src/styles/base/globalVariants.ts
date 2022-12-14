// Main ease function
export const easeInOut = [0.42, 0, 0.58, 1];
export const customEase = [0.6, 0.05, 0.01, 0.9];

// Move and fade in animation for sections
export const sectionVariants = {
    initial: {
        y: '7rem',
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: customEase,
        },
    },
};
