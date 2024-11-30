// General Imports
import React from 'react';
import { useParams } from 'react-router-dom';

// UI Imports
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

// Page Component Imports
import { MDXLayoutRenderer } from 'pliny/mdx-components';

// Content Import
import { allArticles } from '../../../.contentlayer/generated/index.mjs';

const defaultLayout = 'PostLayout';
const layouts = {
  PostLayout: (props) => <div {...props} />, // Add your PostLayout component here
  PostSimple: (props) => <div {...props} />, // Add your PostSimple component here
};

export default function ArticleShow() {
  const { slug } = useParams(); // Get the article slug from the route
  const article = allArticles.find((article) => String(article.slug) === slug);

  if (!article) {
    return <Typography variant="h4">Article not found</Typography>;
  }

  const Layout = layouts[article.layout || defaultLayout];

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h2" gutterBottom>
        {article.title}
      </Typography>

      <Typography variant="body1" sx={{ fontStyle: 'italic', marginBottom: 2 }}>
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

      <Box sx={{ marginTop: 2 }}>
        <Layout content={article} toc={article.toc}>
          <MDXLayoutRenderer code={article.body.code} components={{}} />
        </Layout>
      </Box>
    </Box>
  );
}