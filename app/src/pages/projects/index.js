import * as React from 'react';
import { useEffect, useState } from 'react';

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
import MetaTags from '../../components/layouts/meta_tags'

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

  const filterProjects = (skill='All') => {
    setSelectedSkill(skill);
  
    // Ignoring all drafts
    let filteredProjects = allProjects.filter((project) => project.draft === false);
  
    // Filtering by skill
    filteredProjects = skill === 'All' 
      ? filteredProjects 
      : filteredProjects.filter((project) => project.skills.includes(skill));
  
    // Sorting: Featured first, then by reverse chronological order
    filteredProjects = filteredProjects.sort((a, b) => {
      if (a.featured !== b.featured) {
        return a.featured ? -1 : 1; // Featured projects come first
      }
      const dateA = new Date(a.last_modified || a.date);
      const dateB = new Date(b.last_modified || b.date);
      return dateB - dateA; // Newest projects come first
    });
  
    // Updating the state
    setFilteredProjects(filteredProjects);
  };

  useEffect(() => {
    filterProjects('All'); // Call the filtering function on page load
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div>
      <MetaTags
        title={`Projects`}
        description={'kpvarma.com | My Projects - where I experiment with the latest technologies and share my learnings.'}
        url={'/projects'}
      />

      {/* Heading and Description */}
      <Typography variant="h2" sx={{ color: "text.primary", mb: 2 }}>
        Browse&nbsp;
        <Typography component="span" variant="h2" color="primary.main" sx={{ fontWeight: "inherit", p: "0px !important" }}>
          Projects
        </Typography>
      </Typography>
      <Typography sx={{ color: "text.primary" }} >From Concepts to Code: My Experimental Projects</Typography>

      {/* Filter Section */}
      <Box sx={{ mt: 4 }}>
        {isMobile ? (
          // Show dropdown on mobile
          <Select value={selectedSkill} onChange={(e) => filterProjects(e.target.value)} fullWidth displayEmpty 
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: 1, marginBottom: 2, padding: '8px', }}>
            {skills.map((skill) => (
              <MenuItem key={skill} value={skill}>
                {skill}
              </MenuItem>
            ))}
          </Select>
        ) : (
          // Show chips on larger screens
          <Box
            sx={{ display: 'flex', flexDirection: 'row', gap: 1, flexWrap: 'wrap', }}
          >
            {skills.map((skill) => (
              <Chip key={skill} label={skill} clickable onClick={() => filterProjects(skill)}
                color={selectedSkill === skill ? 'primary' : 'default'}
                sx={{ fontSize: '1rem', minHeight: '36px', padding: '0 16px', lineHeight: '36px',
                  borderRadius: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',}} />
            ))}
          </Box>
        )}
      </Box>

      {/* Rendering Projects */}
      <Grid container  spacing={0} rowSpacing={2} sx={{ mt: 2, mb: 10 }}>
        {filteredProjects.map((project, index) => {
          if (index < 2) {
            // First two projects
            return (
              <Grid item xs={12} sm={6} md={6} lg={6} key={project.slug} sx={{ pl: index === 0 ? '0px !important' : undefined }}>
                <ProjectCard project={project} onFocus={() => {}} onBlur={() => {}} focusedCardIndex={-1} cardIndex={index} />
              </Grid>
            );
          } else {
            // Remaining projects
            return (
              <Grid item xs={12} sm={6} md={4} lg={4} key={project.slug} sx={{ pl: (index - 2) % 3 === 0 ? '0px !important' : undefined }}>
                <ProjectCard project={project} onFocus={() => {}} onBlur={() => {}} focusedCardIndex={-1} cardIndex={index} />
              </Grid>
            );
          }
        })}
      </Grid>
    </div>
  );
}