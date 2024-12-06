import React from 'react';

import { Box, Paper, Typography, Button, Grid, Container, Stack } from '@mui/material';
import { Link } from "react-router-dom";
import LogoCollection from "../components/items/LogoCollection"
import ThreeBoxContent from "../components/items/ThreeBoxContent"

// Components
import MetaTags from '../components/layouts/meta_tags'

const whiteLogos1 = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg',
];

const darkLogos1 = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg',
];

const whiteLogos2 = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg',
];

const darkLogos2 = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg',
];

const sections = [
  {
    title: "Checkout My Works",
    description:
      "Check out some of my work in the <b>Projects</b> section, where I showcase demos of my <b>machine learning</b>, <b>data science</b> projects, and <b>web utilities</b>, along with insights into <b>client projects</b>.",
    button: { text: "Browse Projects", variant: "outlined", color: "primary", size: "large", link: "/projects" },
  },
  {
    title: "Read My Articles",
    description:
      "I also like sharing content related to the stuff that I have learned over the years in <b>Web Development</b> so it can help other people of the <b>Dev Community</b>.",
    button: { text: "Read Articles", variant: "outlined", color: "primary", size: "large", link: "/articles" },
  },
  {
    title: "Find me Online",
    description:
      "Feel free to <b>Connect</b> or <b>Follow me</b> on my <b>Linkedin</b> and <b>Github</b> where I post useful content related to Web Development and Programming.",
    button: [{ text: "LinkedIn", variant: "contained", color: "secondary", size: "large", link: "https://www.linkedin.com/in/krishnaprasadvarma" }, 
             { text: "Github", variant: "outlined", color: "primary", size: "large", link: "https://www.github.com/kpvarma" }, 
             { text: "Kaggle", variant: "outlined", color: "secondary", size: "large", link: "https://www.kaggle.com/kpvarma27" }],
  },

  // <Button variant="contained" color="secondary" size="large" sx={{ whiteSpace: "nowrap" }} component={Link} to="/projects"></Button>
];

export default function AboutMe() {
  return (
    <div>
      <MetaTags
        title={`About Me`}
        description={''}
        url={'/aboutme'}
      />
      
      {/* Heading */}
      <Box 
        sx={{ 
          width: "100%", 
          // height: "80vh", 
          position: "relative", 
          // py: 8, 
          // paddingTop: 2,
          // marginTop: 0,
        }}
      >
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingBottom: 6}}>
          <Typography variant="h1" sx={{ color: "text.primary", mb: 4, maxWidth: "80%" }}>
            Get to&nbsp;
            <Typography component="span" variant="h1" color="primary.main" sx={{ fontWeight: "inherit" }}>
              Know Me.
            </Typography>
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, maxWidth: "80%" }}>
            Let's create something amazing together! Click the button below to learn more about me and my work or to hire me.
          </Typography>
        </Container>
      </Box>

      {/* Skills Section 1 */}
      <Box sx={{ padding: 0, maxWidth: "100%", margin: "0 auto" }}>
        <Grid container spacing={0}>
          {/* Skills Section 1 */}
          <Grid item xs={12} md={6} sx={{pl: "0px !important", my: 5}}>
            <Paper
              elevation={1}
              sx={{
                position: "relative",
                padding: 2,
                // backgroundColor: "primary",
                // border: "1px solid #f1f1f1",
                borderRadius: "4px",
                overflowX: "auto",
                fontFamily: '"Fira Code", "Roboto Mono", monospace',
              }}
            >
              <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: "1rem", color: "#555", marginBottom: 2, }}>
                I’m a Backend-Focused Developer with expertise in <b>Ruby</b>, <b>Python</b>, and <b>Node.js</b>, complemented by practical skills in Full-Stack Development using modern frameworks like <b>React.js</b> and <b>Vue.js</b>, alongside <b>HTML</b>, <b>CSS</b>, and <b>JavaScript</b>.
              </Typography>
            </Paper>
          </Grid>

          {/* Skills Logos 1 */}
          <Grid item xs={12} md={6} sx={{pl: {xs: "0px !important"}}}>
            <LogoCollection 
              whiteLogos={whiteLogos1} 
              darkLogos={darkLogos1} 
            />
          </Grid>
        </Grid>
      </Box>

      {/* Skills Section 2 */}
      <Box sx={{ padding: 0, maxWidth: "100%", margin: "0 auto" }}>
        <Grid container spacing={0}>
          {/* Skills Logos 2 */}
          <Grid item xs={12} md={6} sx={{pl: {xs: "0px !important"}}}>
            <LogoCollection 
              whiteLogos={whiteLogos1} 
              darkLogos={darkLogos1} 
            />
          </Grid>

          {/* Skills Section 2 */}
          <Grid item xs={12} md={6} sx={{pl: "0px !important", my: 5}}>
            <Paper
              elevation={1}
              sx={{
                position: "relative",
                padding: 2,
                // backgroundColor: "primary",
                // border: "1px solid #f1f1f1",
                borderRadius: "4px",
                overflowX: "auto",
                fontFamily: '"Fira Code", "Roboto Mono", monospace',
              }}
            >
              <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: "1rem", color: "#555", marginBottom: 2, }}>
                I have a strong background in leveraging <b>AWS</b> services to design scalable, efficient, and secure cloud solutions. 
                My experience extends beyond development into <b>Data Science</b>, where I utilize my knowledge of <b>machine learning algorithms</b> and data analysis to solve complex problems and derive meaningful insights.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <ThreeBoxContent sections={sections}/>
      
      {/* Projects and articles */}
      <Box sx={{ padding: 0, maxWidth: "100%", mt: 20 }}>
        <Typography variant="h4" sx={{ color: "text.primary", textAlign: "center" }}>
          Checkout My Works
        </Typography>
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Grid container spacing={0}>
            {/* Projects Section */}
            <Grid item xs={12} md={6} sx={{pl: "0px !important", my: 5, p: "5px 10px"}}>
              <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: "1rem", color: "#555", marginBottom: 2, textAlign: 'center' }}>
                Check out some of my work in the <b>Projects</b> section, where I showcase demos of my <b>machine learning</b>, <b>data science</b> projects, and <b>web utilities</b>, along with insights into <b>client projects</b>, complete with screenshots and videos.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ maxWidth: {xs: "600px", sm: "100%"}, justifyContent: "center" }} >
                <Button variant="contained" color="secondary" size="large" sx={{ whiteSpace: "nowrap" }} component={Link} to="/projects">
                  Browse Projects
                </Button>
              </Stack>
            </Grid>

            {/* Articles Section */}
            <Grid item xs={12} md={6} sx={{pl: {xs: "0px !important"}, my: 5, p: "5px 10px"}}>
              <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: "1rem", color: "#555", marginBottom: 2, textAlign: 'center' }}>
              I also like sharing content related to the stuff that I have learned over the years in Web Development so it can help other people of the Dev Community.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ maxWidth: {xs: "600px", sm: "100%"}, justifyContent: "center" }} >
                <Button variant="outlined" color="primary" size="large" sx={{ whiteSpace: "nowrap" }} component={Link} to="/articles">
                  Read Articles
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Social Links Section */}
      <Box  sx={{  width: "100%",  height: "60vh",  position: "relative", mt: 20 }}>
        <Container
          sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingBottom: 6}}
        >
          <Typography variant="h4" sx={{ color: "text.primary", mb: 4, maxWidth: "80%" }}>
            Find me Online
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, maxWidth: "80%" }}>
          Feel free to Connect or Follow me on my Linkedin and Instagram where I post useful content related to Web Development and Programming.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ maxWidth: {xs: "600px", sm: "100%"}, justifyContent: "center" }}
          >
            <Button variant="contained" color="secondary" size="large" sx={{ whiteSpace: "nowrap" }} component={Link} to="https://www.linkedin.com/in/krishnaprasadvarma" target="_blank">
              LinkedIn
            </Button>
            <Button variant="outlined" color="secondary" size="large" sx={{ whiteSpace: "nowrap" }} component={Link} to="https://github.com/kpvarma" target="_blank">
              GitHub
            </Button>
            <Button variant="outlined" color="primary" size="large" sx={{ whiteSpace: "nowrap" }} component={Link} to="https://www.kaggle.com/kpvarma27" target="_blank">
              Kaggle
            </Button>
          </Stack>
        </Container>
      </Box>

    </div>
  );
}