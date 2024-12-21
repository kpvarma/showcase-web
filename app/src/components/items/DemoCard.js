import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

// UI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';

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

// Skill Component
function Skill({ skills }) {
  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {skills.map((skill, index) => (
        <Chip
          key={index}
          label={skill} // Directly use the skill string
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

Skill.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string).isRequired, // Expect array of strings
};

// DemoCard Component
export default function DemoCard({
  demo,
  onFocus,
  onBlur,
  focusedCardIndex = -1, // Default value
  cardIndex,
}) {
  return (
    <Link to={`/demos/${demo.url}`} style={{ textDecoration: 'none' }}>
      <StyledCard
        variant="outlined"
        onFocus={() => onFocus(cardIndex)}
        onBlur={onBlur}
        tabIndex={0}
        className={focusedCardIndex === cardIndex ? 'Mui-focused' : ''}
        sx={{ marginLeft: 1, marginRight: 1 }}
      >
        <CardMedia
          component="img"
          alt={demo.title}
          image={imageLibrary.getDemoImage(demo.thumb_image)}
          sx={{
            aspectRatio: '16 / 9',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        />
        <StyledCardContent>
          <Typography gutterBottom variant="h6" component="div">
            {demo.title}
          </Typography>
          <StyledTypography variant="body2" color="text.secondary" gutterBottom>
            {demo.summary}
          </StyledTypography>
          <Skill skills={demo.skills} />
        </StyledCardContent>
      </StyledCard>
    </Link>
  );
}

DemoCard.propTypes = {
  demo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    last_modified: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired, // Updated to expect array of strings
    thumb_image: PropTypes.string.isRequired,
    cover_image: PropTypes.string.isRequired,
    layout: PropTypes.string,
    draft: PropTypes.bool,
    featured: PropTypes.bool,
  }).isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  focusedCardIndex: PropTypes.number,
  cardIndex: PropTypes.number.isRequired,
};