import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

import { COMPANY_NAME, GITHUB_URL, LINKEDIN_URL } from '../../utils/constants';

type Meta =
    | {
          name: string;
          content: any;
      }
    | {
          property: string;
          content: any;
      };

interface IProps {
    title?: string;
    description?: string;
    lang?: string;
    meta?: Meta[];
    pathname?: string;
}

const SEO: React.FC<IProps> = ({
    title,
    description,
    lang,
    meta,
    pathname,
}): JSX.Element => {
    const { site } = useStaticQuery(detailsQuery);

    const metaTitle = `${COMPANY_NAME} | ${
        title ? title : site.siteMetadata.title
    }`;
    const metaDescription = description || site.siteMetadata.description;
    const metaKeywords = site.siteMetadata.keywords;

    return (
        // TODO Replace Helmet with built-in solution in Gatsby
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={metaTitle}
            titleTemplate={metaTitle}
            meta={[
                {
                    name: 'description',
                    content: metaDescription,
                },
                {
                    property: 'og:title',
                    content: metaTitle,
                },
                {
                    property: 'og:description',
                    content: metaDescription,
                },
                {
                    property: 'og:type',
                    content: 'website',
                },
                {
                    property: 'og:url',
                    content: `${site.siteMetadata.url}${pathname}`,
                },
                {
                    property: 'og:site_name',
                    content: { COMPANY_NAME },
                },
                {
                    property: 'og:see_also',
                    content: { LINKEDIN_URL },
                },
                {
                    property: 'og:see_also',
                    content: { GITHUB_URL },
                },
                {
                    property: 'og:locale',
                    content: 'en_US',
                },
                {
                    property: 'twitter:card',
                    content: 'summary_large_image',
                },
                {
                    property: 'twitter:creator',
                    content: site.siteMetadata.author,
                },
                {
                    property: 'twitter:description',
                    content: metaDescription,
                },
                {
                    property: 'twitter:title',
                    content: metaTitle,
                },
            ]
                .concat(
                    metaKeywords && metaKeywords.length > 0
                        ? {
                              name: `keywords`,
                              content: metaKeywords.join(`, `),
                          }
                        : []
                )
                .concat(meta!)}
        />
    );
};

export default SEO;

SEO.defaultProps = {
    description: '',
    lang: 'en-US',
    meta: [] as Meta[],
};

const detailsQuery = graphql`
    query DefaultSeo {
        site {
            siteMetadata {
                title
                description
                author
                url
                keywords
            }
        }
    }
`;
