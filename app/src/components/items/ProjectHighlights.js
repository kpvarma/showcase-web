import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Grid, Divider } from '@mui/material';

// Content Import
import { allProjects } from '../../../.contentlayer/generated/index.mjs';

// Page Component Imports
import ProjectCard from '../../components/items/ProjectCard';

// Get the first 3 projects
const firstThreeProjects = allProjects.slice(0, 3);

export default function ProjectHighlights() {
  return (
    <Box sx={{ padding: 0, marginBottom: 20 }}>
      {/* Projects Section */}
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 2,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Projects
          </Typography>
          <Button
            component={Link}
            to="/projects"
            variant="contained"
          >
            Browse All
          </Button>
        </Box>
        <Divider/>
        <Grid container spacing={0}>
          {firstThreeProjects.map((project, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
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
          ))}
        </Grid>
      </Box>
    </Box>
  );
}