import { graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';

import { useSectionAnimation } from '../../hooks/useSectionAnimation';
import { useStore } from '../../hooks/useStore';
import { Cursor } from '../../models/cursor';
import { sectionVariants } from '../../styles/base/globalVariants';
import { About, HomeAboutSection, Skills } from '../../styles/pages/homeStyles';
import Accordion from '../ui/Accordion';

interface Skill {
    frontmatter: {
        title: string;
        results: string[];
    };
}

const HomeAbout = (): JSX.Element => {
    const { allMdx } = useStaticQuery(graphql`
        query {
            allMdx(
                filter: { frontmatter: { category: { eq: "skills" } } }
                sort: { frontmatter: { displayOrder: ASC } }
            ) {
                nodes {
                    frontmatter {
                        results
                        title
                    }
                }
            }
        }
    `);

    const skills: Skill[] = allMdx.nodes;

    const store = useStore();
    const { setCursor } = store.uiStore;

    const [expanded, setExpanded] = useState(0);

    const { ref, animation } = useSectionAnimation();

    return (
        <HomeAboutSection
            ref={ref}
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
                    onMouseEnter={() => setCursor(Cursor.Hovered)}
                    onMouseLeave={() => setCursor()}
                >
                    {skills.map((item, index) => (
                        <Accordion
                            key={index}
                            details={item.frontmatter}
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
