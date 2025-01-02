import React from 'react';

// UI Imports
import { useTheme } from '@mui/material/styles';
import { Box, Paper, Typography, Grid, Container } from '@mui/material';

// Page Component Imports
import MetaTags from '../../components/layouts/meta_tags'
import LogoSlider from "./components/LogoSlider"
import ThreeBoxContent from "./components/ThreeBoxContent"

// Asset Imports
import imageLibrary from '../../components/utils/image_library';
import skillsLibrary from '../../components/utils/skills_library';

const skills = skillsLibrary.list.map(skill => skill.url);

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
    button: [{ text: "LinkedIn", variant: "contained", color: "secondary", size: "large", link: "https://www.linkedin.com/in/krishnapvarma" }, 
             { text: "Github", variant: "outlined", color: "primary", size: "large", link: "https://www.github.com/kpvarma" }, 
             { text: "Kaggle", variant: "outlined", color: "secondary", size: "large", link: "https://www.kaggle.com/kpvarma27" }],
  },
];

export default function AboutMe() {
  const theme = useTheme();
  return (
    <div>
      {/* <MetaTags
        title={`About Me Working`}
        url={'/aboutme'}
        image={imageLibrary.getLinkPreviewImage('aboutme.png')}
      /> */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "80vh",
          display: "flex",
          flexDirection: {x: "column-reverse", sm: "row"},
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            textAlign: "left",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 4,
            backgroundColor: theme.palette.mode === 'dark'
              ? 'paper' // Background color for dark mode
              : 'transparent', // Background color for light mode
            }}
        >
          <Grid container spacing={0}>
            <Grid item xs={12} md={4} sx={{pl: "0px !important", my: 0}}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center', // Center vertically
                  justifyContent: 'center', // Center horizontally
                  height: '60vh', // Full viewport height for vertical alignment
                }}
              >
                <img
                  src={imageLibrary.about_me}
                  alt="About Me Abstract Background"
                  style={{
                    width: '100%', // Default for large screens
                    maxWidth: '100%', // Prevent exceeding container
                    height: 'auto',
                    borderRadius: '8px',
                    maxWidth: '100%', // Shrinks to 60% on mobile
                    '@media (minWidth: 600px)': {
                      width: '100%', // 100% for larger screens
                    },
                  }}
                />
              </div>
            </Grid>
            
            <Grid item xs={12} md={8} sx={{ my: 0}}>
              <Typography variant="h2" sx={{ color: "text.primary", mb: 4, maxWidth: "80%", pl: 4 }}>
                Get to&nbsp;
                <Typography component="span" variant="h2" color="primary.main" sx={{ fontWeight: "inherit", p: "0px !important" }}>
                  Know Me.
                </Typography>
              </Typography>
              <Box sx={{ px: 4, py: 3, maxWidth: "100%" }}>
                <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.8, mb: 2 }}>
                  I am a programming enthusiast, and my passion comes from its capacity for impactful solutions.
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 3, mb: 1 }}>
                  Why Work with Me?
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.8, mb: 2 }}>
                  Do you have a challenging problem or an innovative idea that requires software engineering expertise to bring it to life?
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 3, mb: 1 }}>
                  What We Can Achieve Together
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.8, mb: 2 }}>
                  We can work together to create a solution that perfectly aligns with your vision and goals.
                  I am known for understanding my clients’ unique needs and crafting tailored solutions that truly make a difference.
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 3, mb: 1 }}>
                  What Sets Me Apart
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.8 }}>
                  When you work with me, you’re not just hiring a developer; you’re partnering with someone who is dedicated to delivering scalable, 
                  reliable, and impactful software that drives results while fostering a collaborative and seamless experience.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

      </Box>
      
      {/* More About Me */}
      <Box sx={{  width: "100%", position: "relative", pt: 6}}>
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", p: "2px !important"}}>
          <Typography variant="h2" sx={{ color: "text.primary", mb: 4, maxWidth: "80%" }}>
            More&nbsp;
            <Typography component="span" variant="h2" color="primary.main" sx={{ fontWeight: "inherit" }}>
              About Me.
            </Typography>
          </Typography>
        </Container>
      </Box>

      {/* Skills Section */}
      <Box sx={{ padding: 0, maxWidth: "100%", margin: "0 auto" }}>
        <Grid container spacing={0}>
          {/* Skills Section 1 */}
          <Grid item xs={12} md={6} sx={{pl: "0px !important", my: 0}}>
            <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.8, mb: 2, px: 4, pt: 0 }}>
              With over 17 years of experience in software development, I specialize in creating robust, scalable, and efficient systems tailored to client needs. My journey spans diverse domains, from startups to established enterprises, where I have led engineering teams, architected complex solutions, and delivered impactful products. Now, as a freelancer, I bring this expertise to help businesses of all sizes achieve their goals through innovative and reliable software solutions.
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.8, mb: 2, px: 4, pt: 0 }}>
              I’m a Backend-Focused Developer with expertise in <b>Ruby</b>, <b>Python</b>, and <b>Node.js</b>, complemented by practical skills in Full-Stack Development using modern frameworks like <b>React.js</b> and <b>Vue.js</b>, alongside <b>HTML</b>, <b>CSS</b>, and <b>JavaScript</b>.
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.8, mb: 2, px: 4 }}>
              I have a strong background in leveraging <b>AWS</b> services to design scalable, efficient, and secure cloud solutions. 
              My experience extends beyond development into <b>Data Science</b>, where I utilize my knowledge of <b>machine learning algorithms</b> and data analysis to solve complex problems and derive meaningful insights.
            </Typography>
          </Grid>
          {/* Skills Logos */}
          <Grid item xs={12} md={6} sx={{pl: {xs: "0px !important"}, pt: "0px !important" }}>
            <LogoSlider logos={skills} rows={4} columns={4} interval={9000} />
          </Grid>
        </Grid>
      </Box>

      <ThreeBoxContent sections={sections}/>

    </div>
  );
}