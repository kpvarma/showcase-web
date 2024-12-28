// General Imports
import React from 'react';
import { useParams } from 'react-router-dom';

// UI Imports
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

// Page Component Imports
import MetaTags from '../../components/layouts/meta_tags'

// MDX Imports
import { MDXLayoutRenderer } from 'pliny/mdx-components';
import MuiComponents from '../../components/layouts/mdx-mui-components';

// Asset Imports
import imageLibrary from '../../components/utils/image_library';

// Stylesheet Imports
// import 'highlight.js/styles/atom-one-dark.css';
// import 'highlight.js/styles/atom-one-light.css';
// import 'highlight.js/styles/github.css';
import 'highlight.js/styles/github-dark.css';
// import 'highlight.js/styles/solarized-dark.css';
// import 'highlight.js/styles/default.css';
// import 'highlight.js/styles/vs.css';
// import 'highlight.js/styles/vs2015.css';
// import '../../stylesheets/overrides.css'

// Content Import
import { allArticles } from '../../../.contentlayer/generated/index.mjs';

const defaultLayout = 'PostLayout';
const layouts = {
  PostLayout: (props) => <div {...props} />, // Add your PostLayout component here
  PostSimple: (props) => <div {...props} />, // Add your PostSimple component here
};

// Extend mdx-mui-components with custom components
const components = {
  ...MuiComponents,
};

export default function ArticleShow() {
  const { slug } = useParams();
  const article = allArticles.find((article) => String(article.slug) === slug);

  const liveArticles = allArticles
    .filter((article) => article.draft === false) // Only include non-draft articles
    .filter((article) => article.slug !== slug) // Exclude the article with the matching slug
    .sort((a, b) => b.score - a.score); // Sort by score in descending order
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen is mobile

  if (!article) {
    return (
      <Box
        sx={{
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: 'text.primary',
            textAlign: 'center',
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
        url={`/articles/${article.slug}`}
        image={imageLibrary.getArticleImage(article.cover_image)}
      />
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 3 }}>
        <Box sx={{ flex: 3, padding: 2 }}>
          {/* Main Content */}
          {article.cover_image && (
            <img
              src={imageLibrary.getArticleImage(article.cover_image)}
              alt={article.title}
              style={{
                width: '100%',
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          )}
          <Typography variant="h2" gutterBottom sx={{ color: 'text.primary', mt: article.cover_image ? 10 : 0 }}>
            {article.title}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontStyle: 'italic', marginBottom: 2 }}>
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
          <Divider sx={{mt: 2}}></Divider>
          <Box sx={{ marginTop: 2 }}>
            <Layout content={article} toc={article.toc}>
              <MDXLayoutRenderer code={article.body.code} components={components} />
            </Layout>
          </Box>
        </Box>

        {/* Sidebar */}
        <Box
          sx={{
            flex: 1,
            padding: 2,
            borderLeft: !isMobile ? '1px solid' : 'none',
            borderColor: 'divider',
            marginTop: isMobile ? 4 : 0,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
            Recommended Reads
          </Typography>
          <List sx={{ padding: 0, margin: 0, listStyle: 'none' }}>
            {liveArticles.map((otherArticle) => (
              <ListItem
                key={otherArticle.slug}
                disablePadding
                sx={{ padding: '8px 0', display: 'block' }}
              >
                <Link
                  href={`/articles/${otherArticle.slug}`}
                  underline="hover"
                  sx={{
                    display: 'block',
                    padding: '4px 0',
                  }}
                >
                  <ListItemText
                    primary={otherArticle.title}
                    secondary={new Date(otherArticle.date).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  />
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </div>
  );
}