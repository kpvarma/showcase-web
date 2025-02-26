// General Imports
import React, { useState, useEffect } from 'react';
import { createElement } from 'react';
import { useParams } from 'react-router-dom';

// UI Imports
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

// Page Component Imports
import { MDXLayoutRenderer } from 'pliny/mdx-components';
import { MDXProvider } from '@mdx-js/react';
import { compile, run } from '@mdx-js/mdx';
import MuiComponents from '../../components/layouts/mdx-mui-components';
import MetaTags from '../../components/layouts/meta_tags'

// Content Import
import { allArticles } from '../../../.contentlayer/generated/index.mjs';

// Stylesheets
import '../../stylesheets/overrides.css'

const defaultLayout = 'PostLayout';
const layouts = {
  PostLayout: (props) => <div {...props} />, // Add your PostLayout component here
  PostSimple: (props) => <div {...props} />, // Add your PostSimple component here
};

// Extend mdx-mui-components with custom components
const components = {
  ...MuiComponents
};

// Dynamic MDX Renderer
const DynamicMDXRenderer = ({ mdxContent }) => {
  const [MDXComponent, setMDXComponent] = useState(null);

  useEffect(() => {
    const renderMDX = async () => {
      try {
        const compiledMDX = await compile(mdxContent, { outputFormat: 'function-body' });
        const mdxModule = await run(compiledMDX, { jsx: createElement });
        setMDXComponent(() => mdxModule.default);
      } catch (err) {
        console.error('Error compiling MDX:', err);
      }
    };

    renderMDX();
  }, [mdxContent]);

  if (!MDXComponent) return <p>Loading content...</p>;

  return (
    <MDXProvider components={MuiComponents}>
      <MDXComponent />
    </MDXProvider>
  );
};

export default function ArticleShow() {
  const { slug } = useParams(); // Get the article slug from the route
  const article = allArticles.find((article) => String(article.slug) === slug);

  if (!article) {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography 
          variant="h2" 
          sx={{
            color: "text.primary", 
            textAlign: "center",
          }}
        >
          Article '{slug}' not found
        </Typography>
      </Box>
    );
  }

  const Layout = layouts[article.layout || defaultLayout];

  return (
    <div>
      <MetaTags
        title={article.title}
        description={article.summary}
        url={'/articles/{article.slug}'}
        image={article.cover_image}
      />
      <Box sx={{ padding: 2 }}>
        <Typography variant="h2" gutterBottom sx={{ color: "text.primary" }}>
          {article.title}
        </Typography>

        <Typography variant="body1" sx={{ color: "text.secondary", fontStyle: 'italic', marginBottom: 2 }}>
          Published on:{' '}
          {new Date(article.date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 1 }}>
          {article.tags.map((tag, index) => (
            <Chip key={index} label={tag} color="primary" />
          ))}
        </Box>

        <Box sx={{ marginTop: 10 }}>
          {/* <Layout content={article} toc={article.toc}> */}
            {/* <MDXLayoutRenderer code={article.body.code} components={components} /> */}
            {/* <DynamicMDXRenderer mdxContent={article.body} /> */}
          {/* </Layout> */}

          <MDXProvider components={MuiComponents}>
            <article.body.code />
          </MDXProvider>
        </Box>
      </Box>
    </div>
  );
}