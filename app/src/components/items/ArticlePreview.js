import React from 'react';
import PropTypes from 'prop-types';

// UI Imports
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// Page Component Imports
import ArticleTags from './Tags'
import { getTimeAgo } from '../utils/date_format';

function ArticlePreview({ article, marginBottom=2, paddingBottom=2 }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // padding: 2,
        // boxShadow: 1,
        // borderRadius: 2,
        // backgroundColor: 'background.paper',
        mb: marginBottom,
        pb: paddingBottom,
        borderBottom: "1px solid #e0e0e0"
      }}
    >
      <Link to={`/articles/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Typography variant="h5"  color="text.primary" gutterBottom>
          {article.title}
        </Typography>
      </Link>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {article.summary}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {/* Score: {article.score} &nbsp; */}
        Published {getTimeAgo(article.date)}
        {article.last_modified && ` and last modified ${getTimeAgo(article.last_modified)}`}
      </Typography>
      <Box sx={{ mt: 0 }}>
        <ArticleTags tags={article.tags} />
      </Box>
    </Box>
  );
}

ArticlePreview.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    last_modified: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export default ArticlePreview;