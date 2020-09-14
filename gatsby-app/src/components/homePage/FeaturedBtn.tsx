import React from 'react';
// Imports from src
import { useStore } from '../../hooks/useStore';
import { useSectionAnimation } from '../../hooks/useSectionAnimation';
import { FeaturedButton } from '../../styles/pages/homeStyles';
import { sectionVariants } from '../../styles/base/globalVariants';

const FeaturedBtn = (): JSX.Element => {
    const store = useStore();
    const { setCursor, toggleOpen } = store.uiStore;

    const { ref, animation } = useSectionAnimation();

    return (
        <FeaturedButton
            ref={ref}
            initial="initial"
            animate={animation}
            variants={sectionVariants}
        >
            <button
                onClick={() => toggleOpen()}
                onMouseEnter={() => setCursor('pointer')}
                onMouseLeave={() => setCursor()}
            >
                <span>All Projects</span>
            </button>
        </FeaturedButton>
    );
};

export default FeaturedBtn;
