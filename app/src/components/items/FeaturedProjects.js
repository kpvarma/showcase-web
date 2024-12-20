import React from 'react';

// UI Imports
import Box from '@mui/material/Box';
import Carousel from 'react-material-ui-carousel'

// Page Component Imports
import ProjectCard from '../../components/items/ProjectCard';

// Content Import
import { allProjects } from '../../../.contentlayer/generated/index.mjs';

const FeaturedProjects = () => {

    let featuredProjects = allProjects
                                .filter(project => project.featured)
                                .filter((article) => !article.draft) // Step 1: Ignore all drafts
                                .sort((a, b) => b.score - a.score) // Sort by score in descending order
                                .slice(0, 5);
    return (
      <Box sx={{width: '100%'}}>
        <Carousel
          indicators={false}
          navButtonsAlwaysVisible={false}
          animation="slide"
        >
          {
            featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.slug || index}
                project={project}
                onFocus={() => {}}
                onBlur={() => {}}
                focusedCardIndex={-1}
                cardIndex={index}
              />
            ))
          }
        </Carousel>
      </Box>
    );
};

export default FeaturedProjects;