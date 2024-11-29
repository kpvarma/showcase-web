import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';

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
            label={skill.name}
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
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// ProjectCard Component
export default function ProjectCard({
    project,
    onFocus,
    onBlur,
    focusedCardIndex = -1, // Default value
    cardIndex,
  }) {
    return (
      <Link to={`/projects/${project.slug}`} style={{ textDecoration: 'none' }}>
        <StyledCard
          variant="outlined"
          onFocus={() => onFocus(cardIndex)}
          onBlur={onBlur}
          tabIndex={0}
          className={focusedCardIndex === cardIndex ? 'Mui-focused' : ''}
        >
          <CardMedia
            component="img"
            alt={project.title}
            image={project.thumb_image}
            sx={{
              aspectRatio: '16 / 9',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          />
          <StyledCardContent>
            <Typography gutterBottom variant="h6" component="div">
              {project.title} | {project.slug} | {project.id}
            </Typography>
            <StyledTypography variant="body2" color="text.secondary" gutterBottom>
              {project.summary}
            </StyledTypography>
            <Skill skills={project.skills} />
          </StyledCardContent>
        </StyledCard>
      </Link>
    );
  }

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    date_published: PropTypes.string.isRequired,
    date_modified: PropTypes.string,
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    thumb_image: PropTypes.string.isRequired,
    cover_image: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    layout: PropTypes.string.isRequired,
    draft: PropTypes.bool.isRequired,
  }).isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  focusedCardIndex: PropTypes.number,
  cardIndex: PropTypes.number.isRequired,
};