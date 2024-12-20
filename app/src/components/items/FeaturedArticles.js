import React from 'react';
import { Link } from 'react-router-dom';

// UI Imports
import { styled } from '@mui/material/styles';
import { Box, Chip, Button, Typography } from '@mui/material';

// Page Component Imports
import { getTimeAgo } from '../utils/date_format';
import ArticlePreview from './ArticlePreview';

// Content Import
import { allArticles } from '../../../.contentlayer/generated/index.mjs';

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const FeaturedArticles = () => {
  const featuredArticles = allArticles.filter(article => article.featured).slice(0, 3);

  return (
    <Box
      sx={{
        display: { xs: 'flex', sm: 'flex' },
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
              pl: 2,
              textAlign: 'left',
              height: '100%',
              width: '100%',
              '&:hover': {
                backgroundColor: (theme.vars || theme).palette.action.hover,
              },
            })
          ]}
        >
          <ArticlePreview key={article.slug} article={article} paddingBottom={0} />
          {/* <Box
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
                  Published {getTimeAgo(article.date)}
                  {article.last_modified && ` and last modified ${getTimeAgo(article.last_modified)}`}
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ textAlign: 'right' }}>
                  Read Article
                </Typography>
              </Box>
            </Link>
          </Box> */}
        </Box>
      ))}
    </Box>
  );
};

export default FeaturedArticles;

  