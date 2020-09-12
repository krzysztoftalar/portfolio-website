import React, { useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// Imports from src
import { About, HomeAboutSection, Skills } from '../../styles/pages/homeStyles';
import Accordion from '../ui/Accordion';
import { useStore } from '../../hooks/useStore';
import { sectionVariants } from '../../styles/base/globalVariants';

interface Skill {
    node: {
        frontmatter: {
            title: string;
            results: string[];
        };
    };
}

const HomeAbout = (): JSX.Element => {
    const { allMdx } = useStaticQuery(graphql`
        query {
            allMdx(
                filter: { frontmatter: { category: { eq: "skills" } } }
                sort: { order: ASC, fields: fileAbsolutePath }
            ) {
                edges {
                    node {
                        frontmatter {
                            results
                            title
                        }
                    }
                }
            }
        }
    `);

    const skills: Skill[] = allMdx.edges;

    const [expanded, setExpanded] = useState(0);

    const store = useStore();
    const { setCursor } = store.uiStore;

    const animation = useAnimation();
    const [aboutRef, inView] = useInView({
        triggerOnce: true,
        rootMargin: '-200px',
    });

    useEffect(() => {
        if (inView) {
            animation.start('animate');
        }
    }, [animation, inView]);

    return (
        <HomeAboutSection
            ref={aboutRef}
            initial="initial"
            animate={animation}
            variants={sectionVariants}
        >
            <About>
                <h2>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aliquid architecto blanditiis commodi culpa illo odit
                    officia quaerat ratione ullam ut!
                </h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Accusantium, adipisci consequatur cum cupiditate delectus
                    deleniti dicta dolor et id, ipsum laudantium maxime minima
                    minus modi nemo nisi odio, odit officiis pariatur quam quas
                    quod saepe sit soluta sunt vel voluptates.
                </p>
            </About>

            <Skills>
                <h3>Skills</h3>

                <div
                    onMouseEnter={() => setCursor('hovered')}
                    onMouseLeave={() => setCursor()}
                >
                    {skills.map((item, index) => (
                        <Accordion
                            key={index}
                            details={item.node.frontmatter}
                            index={index}
                            expanded={expanded}
                            setExpanded={setExpanded}
                        />
                    ))}
                </div>
            </Skills>
        </HomeAboutSection>
    );
};

export default HomeAbout;
