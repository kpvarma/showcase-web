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
  const [selectedTag, setSelectedTag] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(allProjects);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const filterProjects = (skill = 'All', tag = 'All') => {
    setSelectedSkill(skill);
    setSelectedTag(tag);
  
    // Step 1: Ignore all drafts
    let filteredProjects = allProjects.filter((article) => !article.draft);
    
    // Step 2: Filter by tag
    if (tag !== 'All') {
      filteredProjects = filteredProjects.filter((article) => article.tags.includes(tag));
    }

    // Step 3: Filtering by skill
    filteredProjects = skill === 'All' 
      ? filteredProjects 
      : filteredProjects.filter((project) => project.skills.includes(skill));

    // Step 3: Sort by score (featured status and then by reverse chronological order)
    filteredProjects = filteredProjects.sort((a, b) => b.score - a.score);
  
    // Step 4: Update the state
    setFilteredProjects(filteredProjects);
  };

  // Extract unique skills
  const skills = [
    'All',
    ...new Set(allProjects.filter((project) => project.draft === false).flatMap((project) => project.skills)),
  ];

  // Extract unique tags
  const tags = [
    'All',
    ...new Set(allProjects.filter((project) => project.draft === false).flatMap((project) => project.tags)),
  ];

  useEffect(() => {
    filterProjects('All', 'All'); // Call the filtering function on page load
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div>
      {/* <MetaTags
        title={`Projects`}
        description={'kpvarma.com | My Projects - where I experiment with the latest technologies and share my learnings.'}
        url={'/projects'}
      /> */}
      {/* Heading and Description */}
      <Typography variant="h2" sx={{ color: "text.primary", mb: 2 }}>
        Browse&nbsp;
        <Typography component="span" variant="h2" color="primary.main" sx={{ fontWeight: "inherit", p: "0px !important" }}>
          Projects
        </Typography>
      </Typography>
      <Typography sx={{ color: "text.primary" }} >From Concepts to Code: My Experimental Projects</Typography>

      {/* Skills Filter */}
      <Box sx={{ mt: 4 }}>
        {isMobile ? (
          // Show dropdown on mobile
          <Select value={selectedSkill} onChange={(e) => filterProjects(selectedSkill, e.target.value)} fullWidth displayEmpty 
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
              <Chip key={skill} label={skill} clickable onClick={() => filterProjects(skill, 'All')}
                color={selectedSkill === skill ? 'primary' : 'default'}
                sx={{ fontSize: '1rem', minHeight: '36px', padding: '0 16px', lineHeight: '36px',
                  borderRadius: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',}} />
            ))}
          </Box>
        )}
      </Box>

      {/* Grid Layout */}
      <Grid container spacing={0} sx={{ width: '100%', mt: 4 }}>
        {/* Sidebar or Dropdown */}
        {isMobile ? (
          <Grid item xs={12} sx={{}}>
            <Select
              value={selectedTag} onChange={(e) => filterArticles(e.target.value)} fullWidth displayEmpty
              sx={{ backgroundColor: '#f9f9f9', borderRadius: 1, mb: 2, }} >
              {tags.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        ) : (
          <Grid item xs={12} sm={2} sx={{ pl: '0px !important' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1,}}>
              <Typography variant="h6" gutterBottom sx={{ color: "text.primary" }}>
                Filter by Tags
              </Typography>
              {tags.map((tag) => (
                <Box
                  key={tag} onClick={() => filterProjects('All', tag)}
                  sx={{ fontSize: '1rem', cursor: 'pointer', textDecoration: selectedTag === tag ? 'underline' : 'none',
                    color: selectedTag === tag ? 'primary.main' : 'text.secondary', '&:hover': { color: 'primary.dark' }, }}>
                  {tag}
                </Box>
              ))}
            </Box>
          </Grid>
        )}

        {/* Projects Grid */}
        <Grid item xs={12} sm={isMobile ? 12 : 10} sx={{ pl: isMobile ? '0px' : '0px', mb: 10 }}>
          <Grid container  spacing={0} rowSpacing={2} sx={{ mt: 2, mb: 10 }}>
            {filteredProjects.map((project, index) => (
              <Grid item xs={12} sm={6} md={6} lg={6} key={project.slug} sx={{ pl: (index - 2) % 3 === 0 ? '0px !important' : undefined }}>
                <ProjectCard project={project} onFocus={() => {}} onBlur={() => {}} focusedCardIndex={-1} cardIndex={index} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}