import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Imports from src
import {
    AccordionContent,
    AccordionHeader,
    AccordionIcon,
} from '../../styles/components/accordionStyles';
import { useStore } from '../../hooks/useStore';
import { black, primaryColor, white } from '../../styles/base/variables';
import { Cursor } from '../../models/cursor';
import { ease } from '../../styles/base/globalVariants';

interface IProps {
    details: {
        title: string;
        results: string[];
    };
    index: number;
    expanded: number;
    setExpanded: (id: number) => void;
}

const Accordion: React.FC<IProps> = ({
    details,
    index,
    expanded,
    setExpanded,
}: IProps): JSX.Element => {
    const store = useStore();
    const { setCursor, theme } = store.uiStore;

    const isOpen = index === expanded;
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            onMouseOver={() => {
                isOpen && setCursor();
            }}
            onMouseLeave={() => setCursor(Cursor.Hovered)}
        >
            <AccordionHeader
                onClick={() => setExpanded(index)}
                whileHover={{
                    color: isOpen
                        ? primaryColor
                        : theme === 'dark'
                        ? white
                        : black,
                }}
                transition={{ duration: 0.2, ease: ease }}
                onHoverStart={() => setHovered(!hovered)}
                onHoverEnd={() => setHovered(!hovered)}
            >
                <AccordionIcon>
                    <motion.span
                        animate={{
                            rotate: isOpen || hovered ? 0 : 45,
                            x: -1,
                        }}
                        transition={{
                            duration: 0.2,
                            ease: ease,
                        }}
                    />
                    <motion.span
                        animate={{
                            rotate: isOpen || hovered ? 0 : -45,
                            x: -7,
                        }}
                        transition={{
                            duration: 0.2,
                            ease: ease,
                        }}
                    />
                </AccordionIcon>

                {details.title}
            </AccordionHeader>

            <AccordionContent
                animate={{ height: isOpen ? 'auto' : '0' }}
                transition={{ duration: 0.6, ease: ease }}
            >
                {details.results.map((item, index) => (
                    <span key={index}>{item}</span>
                ))}
            </AccordionContent>
        </motion.div>
    );
};

export default Accordion;
