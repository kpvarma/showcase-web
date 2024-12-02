import * as React from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

// UI Imports
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Page Component Imports
import ProjectCard from '../../components/items/ProjectCard';

// Content Import
import { allProjects } from '../../../.contentlayer/generated/index.mjs';

export default function ProjectIndex() {
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(allProjects);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Extract unique skills
  const skills = [
    'All',
    ...new Set(allProjects.flatMap((project) => project.skills)),
  ];

  const filterProjects = (skill) => {
    setSelectedSkill(skill);

    if (skill === 'All') {
      setFilteredProjects(allProjects); // Reset to all projects
    } else {
      setFilteredProjects(
        allProjects.filter((project) => project.skills.includes(skill))
      );
    }
  };

  return (
    <div>
      <Helmet>
        <title>Projects | Varma Labs - My experiment with tech</title>
        <meta name="description" content="" />
      </Helmet>
      <Typography variant="h1" gutterBottom>
        Projects
      </Typography>
      <Typography>From Concepts to Code: My Experimental Projects</Typography>

      {/* Filter Section */}
      <Box sx={{ marginTop: 2 }}>
        {isMobile ? (
          // Show dropdown on mobile
          <Select
            value={selectedSkill}
            onChange={(e) => filterProjects(e.target.value)}
            fullWidth
            displayEmpty
            sx={{
              backgroundColor: '#f9f9f9',
              borderRadius: 1,
              marginBottom: 2,
              padding: '8px',
            }}
          >
            {skills.map((skill) => (
              <MenuItem key={skill} value={skill}>
                {skill}
              </MenuItem>
            ))}
          </Select>
        ) : (
          // Show chips on larger screens
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              flexWrap: 'wrap',
            }}
          >
            {skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                clickable
                onClick={() => filterProjects(skill)}
                color={selectedSkill === skill ? 'primary' : 'default'}
                sx={{
                  fontSize: '1rem',
                  minHeight: '36px',
                  padding: '0 16px',
                  lineHeight: '36px',
                  borderRadius: '24px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Rendering Projects */}
      <Grid container  spacing={0} rowSpacing={2} sx={{ marginTop: 2 }}>
        {filteredProjects.map((project, index) => {
          if (index < 2) {
            // First two projects
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                key={project.slug}
                sx={{ pl: index === 0 ? '0px !important' : undefined }}
              >
                <ProjectCard
                  project={project}
                  onFocus={() => {}}
                  onBlur={() => {}}
                  focusedCardIndex={-1}
                  cardIndex={index} // Pass the current index
                />
              </Grid>
            );
          } else {
            // Remaining projects
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                key={project.slug}
                sx={{ pl: (index - 2) % 3 === 0 ? '0px !important' : undefined }}
              >
                <ProjectCard
                  project={project}
                  onFocus={() => {}}
                  onBlur={() => {}}
                  focusedCardIndex={-1}
                  cardIndex={index} // Pass the current index
                />
              </Grid>
            );
          }
        })}
      </Grid>
    </div>
  );
}