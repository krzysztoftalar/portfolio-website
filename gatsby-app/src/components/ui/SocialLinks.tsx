import React, { useRef } from 'react';
// Imports from src
import { useElementPosition } from '../../hooks/useElementPosition';
import { useStore } from '../../hooks/useStore';
import SVG from './SVG';
import { Cursor } from '../../models/cursor';
import { GITHUB_URL, LINKEDIN_URL } from '../../utils/constants';

interface IProps {
    isAnimationEnd: boolean;
}

const SocialLinks: React.FC<IProps> = ({
    isAnimationEnd,
}: IProps): JSX.Element => {
    const store = useStore();
    const { setCursor, setElementPosition } = store.uiStore;

    // Cursor locked on links hover
    const githubRef = useRef<HTMLAnchorElement>(null);
    const githubPosition = useElementPosition(githubRef, isAnimationEnd);

    const linkedinRef = useRef<HTMLAnchorElement>(null);
    const linkedinPosition = useElementPosition(linkedinRef, isAnimationEnd);

    const onLinkHover = (x: number, y: number) => {
        if (isAnimationEnd) {
            setCursor(Cursor.Locked);
            setElementPosition(x, y);
        }
    };

    return (
        <>
            <a
                onMouseEnter={() =>
                    onLinkHover(linkedinPosition.x, linkedinPosition.y)
                }
                onMouseLeave={() => setCursor()}
                href={LINKEDIN_URL}
                ref={linkedinRef}
                target="_blank"
                rel="noreferrer noopener"
            >
                <SVG icon="linkedin" />
            </a>

            <a
                onMouseEnter={() =>
                    onLinkHover(githubPosition.x, githubPosition.y)
                }
                onMouseLeave={() => setCursor()}
                href={GITHUB_URL}
                ref={githubRef}
                target="_blank"
                rel="noreferrer noopener"
            >
                <SVG icon="github" />
            </a>
        </>
    );
};

export default SocialLinks;
