import React from 'react';
import { Box, Typography, Button, Grid, Chip } from '@mui/material';

const AboutMe = () => (
  <main className="main-content">
    <Box sx={{ padding: 4, textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
      <Typography variant="h3" gutterBottom>
        About Me
      </Typography>
      <Typography variant="body1" paragraph>
        I’m a passionate developer and data science enthusiast with expertise in crafting 
        innovative solutions using modern technologies. My journey spans across developing 
        applications, exploring machine learning models, and solving complex problems.
      </Typography>

      {/* Skills Section */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Skills
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {[
            'Python',
            'JavaScript',
            'React',
            'Node.js',
            'Ruby',
            'Machine Learning',
            'Data Analysis',
            'TensorFlow',
            'Keras',
            'SQL',
            'Docker',
            'Git',
          ].map((skill) => (
            <Grid item key={skill}>
              <Chip label={skill} color="primary" variant="outlined" />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Links Section */}
      <Box sx={{ marginTop: 6 }}>
        <Typography variant="h4" gutterBottom>
          Find Me Online
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="info"
            href="https://www.linkedin.com/in/yourprofile"
            target="_blank"
          >
            LinkedIn
          </Button>
          <Button
            variant="contained"
            color="secondary"
            href="https://github.com/yourprofile"
            target="_blank"
          >
            GitHub
          </Button>
          <Button
            variant="contained"
            color="success"
            href="https://www.kaggle.com/yourprofile"
            target="_blank"
          >
            Kaggle
          </Button>
        </Box>
      </Box>
    </Box>
  </main>
);

export default AboutMe;