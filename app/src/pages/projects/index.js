// General Imports
import * as React from 'react';
import { useState } from 'react';

// UI Imports
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

// Page Component Imports
import ProjectCard from '../../components/items/ProjectCard';

// Content Import
import { allProjects } from '../../../.contentlayer/generated/index.mjs';

export default function ProjectIndex() {
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(allProjects);

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
      <Typography variant="h1" gutterBottom>
        Projects
      </Typography>
      <Typography>From Concepts to Code: My Experimental Projects</Typography>

      {/* Filter Chips */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          marginTop: 2,
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

      {/* Rendering first Projects as featured and rest as normal */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
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