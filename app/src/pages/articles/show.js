// General Imports
import React from 'react';
import { useParams } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';

// UI Imports
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';

// Page Component Imports
import { MDXLayoutRenderer } from 'pliny/mdx-components';
import MuiComponents from '../../components/layouts/mdx-mui-components';
import MetaTags from '../../components/layouts/meta_tags'

// Asset Imports
import imageLibrary from '../../components/utils/image_library';

// Content Import
import { allArticles } from '../../../.contentlayer/generated/index.mjs';
let liveArticles = allArticles.filter((article) => article.draft === false);

// Stylesheets
// import 'highlight.js/styles/atom-one-dark.css';
// import 'highlight.js/styles/atom-one-light.css';
// import 'highlight.js/styles/github.css';
import 'highlight.js/styles/github-dark.css';
// import 'highlight.js/styles/solarized-dark.css';
// import 'highlight.js/styles/default.css';
// import 'highlight.js/styles/vs.css';
// import 'highlight.js/styles/vs2015.css';
// import '../../stylesheets/overrides.css'

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
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
        <Box sx={{ flex: 3, padding: 2 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center', // Center vertically
              justifyContent: 'center', // Center horizontally
              height: '60vh', // Full viewport height for vertical alignment
            }}
          >
            <img
              src={imageLibrary.getArticleImage(article.cover_image)}
              alt={article.title}
              style={{
                width: '100%', // Default for large screens
                maxWidth: '100%', // Prevent exceeding container
                height: 'auto',
                borderRadius: '8px',
                maxWidth: '100%', // Shrinks to 60% on mobile
                '@media (minWidth: 600px)': {
                  width: '100%', // 100% for larger screens
                },
              }}
            />
          </div>
          <Typography variant="h2" gutterBottom sx={{ color: "text.primary", mt: 10 }}>
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

          {/* <Layout content={article} toc={article.toc}> */}
          {/* </Layout> */}
          
          {/* <Box sx={{ marginTop: 10 }}>
            <MDXLayoutRenderer code={article.body.code} components={components} />
          </Box> */}

          <MDXProvider components={components}>
            <MDXLayoutRenderer code={article.body.code} components={components} />
          </MDXProvider>;
        </Box>
        {/* Right Sidebar */}
        <Box
          sx={{
            flex: 1,
            padding: 2,
            borderLeft: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
            Recommended Reads
          </Typography>
          <List
            sx={{
              padding: 0,
              margin: 0,
              listStyle: 'none', // Ensures no list-style appears
            }}
          >
            {liveArticles.map((otherArticle) => (
              <ListItem
                key={otherArticle.slug}
                disablePadding
                sx={{
                  padding: '8px 0', // Minimal spacing between items
                  borderBottom: 'none', // Ensures no bottom border appears
                  display: 'block', // Prevent inline behavior
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <Link
                    href={`/articles/${otherArticle.slug}`}
                    underline="hover"
                    sx={{
                      display: 'block',
                      padding: '4px 0', // Additional inner padding for link
                    }}
                  >
                    <ListItemText
                      primary={otherArticle.title}
                      secondary={new Date(otherArticle.date).toLocaleDateString(
                        'en-US',
                        { day: 'numeric', month: 'short', year: 'numeric' }
                      )}
                    />
                  </Link>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </div>
  );
}