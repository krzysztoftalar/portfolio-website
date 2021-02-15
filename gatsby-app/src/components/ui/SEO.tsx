import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';

type Meta =
    | {
          name: string;
          content: any;
      }
    | {
          property: string;
          content: any;
      };

interface Props {
    title?: string;
    description?: string;
    lang?: string;
    meta?: Meta[];
    pathname?: string;
}

const SEO: React.FC<Props> = ({
    title,
    description,
    lang,
    meta,
    pathname,
}): JSX.Element => {
    const { site } = useStaticQuery(detailsQuery);

    const metaTitle = `Sivonte: ${title ? title : site.siteMetadata.title}`;
    const metaDescription = description || site.siteMetadata.description;
    const metaKeywords = site.siteMetadata.keywords;

    return (
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
                    content: 'Sivonte',
                },
                {
                    property: 'og:see_also',
                    content: 'https://www.linkedin.com/in/ktalar/',
                },
                {
                    property: 'og:see_also',
                    content: 'https://github.com/krzysztoftalar',
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
