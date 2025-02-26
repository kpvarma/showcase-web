// General Imports
import React from 'react';
import { useParams } from 'react-router-dom';

// UI Imports
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';

// Page Component Imports
import MetaTags from '../../components/layouts/meta_tags'
import ProjectCover from './components/ProjectCover';

// MDX Imports
import { MDXLayoutRenderer } from 'pliny/mdx-components';
import MuiComponents from '../../components/layouts/mdx-mui-components';

// Asset Imports
import imageLibrary from '../../components/utils/image_library';

// Stylesheet Imports
// import 'highlight.js/styles/atom-one-dark.css';
// import 'highlight.js/styles/atom-one-light.css';
// import 'highlight.js/styles/github.css';
import 'highlight.js/styles/github-dark.css';
// import 'highlight.js/styles/solarized-dark.css';
// import 'highlight.js/styles/default.css';
// import 'highlight.js/styles/vs.css';
// import 'highlight.js/styles/vs2015.css';
// import '../../stylesheets/overrides.css'

// Content Import
import { allProjects } from '../../../.contentlayer/generated/index.mjs';
let liveProjects = allProjects.filter((project) => project.draft === false);

const defaultLayout = 'PostLayout';
const layouts = {
  PostLayout: (props) => <div {...props} />, // Add your PostLayout component here
  PostSimple: (props) => <div {...props} />, // Add your PostSimple component here
};

// Extend mdx-mui-components with custom components
const components = {
  ...MuiComponents,
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
      <MetaTags
        title={project.title}
        description={project.summary}
        url={'/articles/{article.slug}'}
        image={imageLibrary.getProjectImage(project.cover_image)}
      />
      <Box sx={{ padding: 2 }}>

        <ProjectCover project={project}/>

        {/* <Typography variant="h2" gutterBottom> {project.title} </Typography>
        <img src={project.cover_image} alt={project.title} style={{ width: '100%', height: 'auto', borderRadius: '8px' }}/> */}

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 1 }}>
          {project.skills.map((skill, index) => (
            <Chip key={index} label={skill} color="primary" />
          ))}
        </Box>

        <Box sx={{ marginTop: 10 }}>
          <Layout content={project} toc={project.toc}>
            <MDXLayoutRenderer code={project.body.code} components={components} />
          </Layout>
        </Box>
      </Box>
    </div>
  );
}