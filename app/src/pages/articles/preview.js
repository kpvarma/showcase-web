import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import ArticleTags from '../../components/items/Tags'
import { Link } from 'react-router-dom';

function formatDate(dateString) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  const daySuffix = (n) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  return `${day}${daySuffix(day)} ${month} ${year}`;
}

function ArticlePreview({ article }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // padding: 2,
        // boxShadow: 1,
        // borderRadius: 2,
        // backgroundColor: 'background.paper',
        mb: 4,
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
        Published: {formatDate(article.date)}
      </Typography>
      {article.date_modified && (
        <Typography variant="caption" color="text.secondary">
          Last Modified: {new Date(article.date_modified).toLocaleDateString()}
        </Typography>
      )}
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
    date_modified: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export default ArticlePreview;