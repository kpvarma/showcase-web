import React from 'react';
import { useParams } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { useMDXComponent } from '@mdx-js/react';

// Content Import
import { allArticles } from '../../../.contentlayer/generated/index.mjs';

// Use this to define custom components for MDX elements if needed
const mdxComponents = {
  h1: (props) => <h1 style={{ color: 'teal' }} {...props} />,
  // Add more customizations here
};

const ArticleShow = () => {
  const { slug } = useParams(); // Get the article slug from the route
  const article = allArticles.find((article) => String(article.slug) === slug);

  // Use the `body.code` field for rendering MDX content
  const MDXContent = useMDXComponent(article.body.code);
  
  return (
    <div className="article-container">
      <header>
        <h1>{article.title}</h1>
        {article.date && (
          <p className="article-date">
            Published on: {new Date(article.date).toLocaleDateString()}
          </p>
        )}
      </header>

      <article>
        <MDXProvider components={mdxComponents}>
          <div dangerouslySetInnerHTML={{ __html: article.body.html }} />
        </MDXProvider>

        <article>
          <MDXContent components={mdxComponents} />
        </article>
      </article>
    </div>
  );
};

export default ArticleShow;