import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

// UI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

// Page Component Imports
import ArticleTags from './Tags'
import { getTimeAgo } from '../../components/utils/date_format';

// Asset Imports
import imageLibrary from '../../components/utils/image_library';

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

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

// ArticleCard Component
export default function ArticleCard({
  article,
  onFocus,
  onBlur,
  focusedCardIndex = -1, // Default value
  cardIndex,
}) {
  return (
    <Link to={`/articles/${article.slug}`} style={{ textDecoration: 'none' }}>
      <StyledCard
        variant="outlined"
        onFocus={() => onFocus(cardIndex)}
        onBlur={onBlur}
        tabIndex={0}
        className={focusedCardIndex === cardIndex ? 'Mui-focused' : ''}
      >
        <CardMedia
          component="img"
          alt={article.title}
          image={imageLibrary.getArticleImage(article.thumb_image)}
          sx={{
            aspectRatio: '16 / 9',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        />
        <StyledCardContent>
          <Typography gutterBottom variant="h6" component="div">
            {article.title}
          </Typography>
          <StyledTypography variant="body2" color="text.secondary" gutterBottom>
            {article.summary}
          </StyledTypography>
          <Typography variant="body2" color="text.secondary">
            Published {getTimeAgo(article.date)}
            {article.last_modified && ` and last modified ${getTimeAgo(article.last_modified)}`}
          </Typography>
          <ArticleTags tags={article.tags} sx={{ marginTop: '20px' }} />
        </StyledCardContent>
      </StyledCard>
    </Link>
  );
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    last_modified: PropTypes.string,
    thumb_image: PropTypes.string.isRequired,
    cover_image: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    layout: PropTypes.string,
    draft: PropTypes.bool,
    featured: PropTypes.bool,
  }).isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  focusedCardIndex: PropTypes.number,
  cardIndex: PropTypes.number.isRequired,
};