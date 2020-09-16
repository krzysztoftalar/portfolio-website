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
}

const SEO: React.FC<Props> = ({
    title,
    description,
    lang,
    meta,
}): JSX.Element => {
    const { site } = useStaticQuery(detailsQuery);

    const metaTitle = title ? title : site.siteMetadata.title;
    const metaDescription = description || site.siteMetadata.description;
    const metaKeywords = site.siteMetadata.keywords;

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={metaTitle}
            titleTemplate={`Viphon: ${metaTitle}`}
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
                    content: site.siteMetadata.url,
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
    lang: 'en',
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
