// General Imports
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// UI Imports
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

// Page Component Imports
import { MDXLayoutRenderer } from 'pliny/mdx-components';
import ProjectCover from '../../components/items/ProjectCover';

// Content Import
import { allProjects } from '../../../.contentlayer/generated/index.mjs';

const defaultLayout = 'PostLayout';
const layouts = {
  PostLayout: (props) => <div {...props} />, // Add your PostLayout component here
  PostSimple: (props) => <div {...props} />, // Add your PostSimple component here
};

export default function ProjectShow() {
  const { slug } = useParams(); // Get the project slug from the route
  const project = allProjects.find((project) => String(project.slug) === slug);

  if (!project) {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography 
          variant="h2" 
          sx={{
            color: "text.primary", 
            textAlign: "center",
          }}
        >
          Project '{slug}' not found
        </Typography>
      </Box>
    );
  }

  const Layout = layouts[project.layout || defaultLayout];

  return (
    <div>
      <Helmet>
        <title>{project.title || 'VarmaLabs - My experiement with the tech'}</title>
        <meta name="description" content={project.summary || 'A platform where I experiment with the latest technologies and share my learnings.'} />
      </Helmet>
      <Box sx={{ padding: 2 }}>

        <ProjectCover project={project}/>

        {/* <Typography variant="h2" gutterBottom> {project.title} </Typography>
        <img src={project.cover_image} alt={project.title} style={{ width: '100%', height: 'auto', borderRadius: '8px' }}/> */}

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 1 }}>
          {project.skills.map((skill, index) => (
            <Chip key={index} label={skill} color="primary" />
          ))}
        </Box>

        <Box sx={{ marginTop: 2}}>
          <Layout content={project} toc={project.toc}>
            <MDXLayoutRenderer code={project.body.code} components={{}} />
          </Layout>
        </Box>
      </Box>
    </div>
  );
}