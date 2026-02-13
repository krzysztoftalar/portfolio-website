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
    const {allMdx} = useStaticQuery(graphql`
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
    const {setCursor} = store.uiStore;

    const [expanded, setExpanded] = useState(0);

    const {ref, animation} = useSectionAnimation();

    return (
        <HomeAboutSection
            ref={ref}
            initial="initial"
            animate={animation}
            variants={sectionVariants}
        >
            <About>
                <h2>
                    🚀 With 5 years of experience in building and operating production-grade systems, I specialize in the
                    .NET ecosystem and Azure cloud. My focus is on delivering solutions that aren't just functional, but
                    are engineered for high performance, scalability, and cost-efficiency under real-world load.
                </h2>
                <p>
                    🛠️ I am a strong advocate of End-to-End Ownership. This means I take full responsibility for a
                    solution throughout its entire lifecycle - from designing architecture and clean backend
                    implementation to automating CI/CD pipelines and production monitoring. While my core expertise lies
                    in backend development, I am hands-on in the frontend whenever the project requires a cohesive
                    full-stack approach.</p>

                <p>🪂 Beyond the code: I thrive on challenges that demand precision and a cool head. My passions include
                    skydiving and mountain trekking - environments where endurance and split-second decision-making are
                    key. I also stay active through basketball and calisthenics, which sharpen my teamwork and
                    discipline. Just like in engineering, I believe in continuous improvement and never shy away from
                    high-stakes technical challenges.</p>

                <p>🤝 Feel free to reach out if you want to discuss cloud architecture, .NET performance, or share some
                    extreme sports stories!</p>
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
