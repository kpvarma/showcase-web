import React from 'react';
import { Link } from 'react-router-dom';

// UI Imports
import { styled } from '@mui/material/styles';
import { Box, Chip, Button, Typography } from '@mui/material';

// Page Component Imports


// Content Import
import { allArticles } from '../../../.contentlayer/generated/index.mjs';

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

// Helper Function for Formatting
const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  const daySuffix = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  return `${day}${daySuffix(day)} ${month} ${year}`;
};

function Tags({ tags }) {
  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginTop: 4 }}>
      {tags.map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          sx={{
            backgroundColor: '#f0f0f0', // Light gray background for the badge
            color: '#333', // Dark text
            fontSize: '0.75rem', // Smaller font size
            fontWeight: 'bold',
            padding: '4px 8px',
            borderRadius: '16px', // Rounded edges for the badge
          }}
        />
      ))}
    </Box>
  );
}

const FeaturedArticles = () => {
  const featuredArticles = allArticles.filter(article => article.featured).slice(0, 5);

  return (
    <Box
      sx={{
        display: { xs: 'none', sm: 'flex' },
        flexDirection: 'column',
        gap: 2,
        height: '100%',
      }}
    >
      {featuredArticles.map((article, index) => (
        <Box
          key={index}
          component={Button}
          sx={[
            (theme) => ({
              p: 2,
              height: '100%',
              width: '100%',
              '&:hover': {
                backgroundColor: (theme.vars || theme).palette.action.hover,
              },
            })
          ]}
        >
          <Box
            sx={[
              {
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                gap: 1,
                textAlign: 'left',
                textTransform: 'none',
                color: 'text.secondary',
              }
            ]}
          >
            <Link to={`/articles/${article.slug}`} style={{ textDecoration: 'none' }}>
              <Typography gutterBottom variant="h6" component="div">
                {article.title}
              </Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {article.summary}
              </StyledTypography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between', // Align items to opposite sides
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Published: {formatDate(article.date)}
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ textAlign: 'right' }}>
                  Read Article
                </Typography>
              </Box>
            </Link>
            {/* <Typography variant="body2" color="text.secondary">
              Published: {formatDate(article.date)}
            </Typography>
            {article.last_modified && (
              <Typography variant="caption" color="text.secondary">
                Last Modified: {new Date(article.last_modified).toLocaleDateString()}
              </Typography>
            )} */}
            {/* <Tags tags={article.tags} sx={{ marginTop: '20px' }} /> */}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default FeaturedArticles;

  