import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Box, Typography, Button, Grid, Chip } from '@mui/material';
import LogoCollection from "../components/items/LogoCollection"

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Wordpress",
  "PHP",
  "SASS",
  "GIT",
  "Github",
  "Responsive Design",
  "SEO",
  "Terminal",
];

export default function AboutMe() {
  return (
    <div>
      <LogoCollection/>
      <Helmet>
        <title>About Me | Varma Labs - My experiement with tech</title>
        <meta name="description" content='' />
      </Helmet>
      <Box sx={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        <Grid container spacing={4}>
          {/* About Me Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
              Get to know me!
            </Typography>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                fontSize: "1rem",
                color: "#555",
                marginBottom: 2,
              }}
            >
              I'm a <b>Frontend Focused Web Developer</b> building and managing
              the Front-end of Websites and Web Applications that lead to the
              success of the overall product. Check out some of my work in the{" "}
              <b>Projects</b> section.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                fontSize: "1rem",
                color: "#555",
                marginBottom: 2,
              }}
            >
              I also like sharing content related to the stuff that I have learned
              over the years in <b>Web Development</b> so it can help other
              people of the Dev Community. Feel free to Connect or Follow me on
              my{" "}
              <a
                href="#"
                style={{ color: "#4c6ef5", textDecoration: "underline" }}
              >
                Linkedin
              </a>{" "}
              and{" "}
              <a
                href="#"
                style={{ color: "#4c6ef5", textDecoration: "underline" }}
              >
                Instagram
              </a>{" "}
              where I post useful content related to Web Development and
              Programming.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                fontSize: "1rem",
                color: "#555",
                marginBottom: 3,
              }}
            >
              I'm open to <b>Job</b> opportunities where I can contribute, learn,
              and grow. If you have a good opportunity that matches my skills and
              experience, then don't hesitate to <b>contact</b> me.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#6200EA",
                color: "#fff",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#5300C5",
                },
              }}
            >
              Contact
            </Button>
          </Grid>

          {/* Skills Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              My Skills
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: "bold",
                    padding: "8px 12px",
                    backgroundColor: "#f4f4f4",
                    color: "#333",
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
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
    </div>
  );
}