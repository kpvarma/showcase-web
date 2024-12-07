import React from 'react';

import { Box, Paper, Typography, Button, Grid, Container, Stack } from '@mui/material';
import LogoSlider from "../components/items/LogoSlider"
import ThreeBoxContent from "../components/items/ThreeBoxContent"

// Components
import MetaTags from '../components/layouts/meta_tags'

import aws from '../assets/skills/aws.png';
import django from '../assets/skills/django.png';
import docker from '../assets/skills/docker.png';
import elasticsearch from '../assets/skills/elasticsearch.png';
import expressjs from '../assets/skills/expressjs.png';
import fastapi from '../assets/skills/fastapi.png';
import github from '../assets/skills/github.png';
import hadoop from '../assets/skills/hadoop.png';
import javascript from '../assets/skills/javascript.png';
import kafka from '../assets/skills/kafka.png';
import kubernetes from '../assets/skills/kubernetes.png';
import mongodb from '../assets/skills/mongodb.png';
import mysql from '../assets/skills/mysql.png';
import nextjs from '../assets/skills/nextjs.png';
import nodejs from '../assets/skills/nodejs.png';
import nuxtjs from '../assets/skills/nuxtjs.png';
import postgresql from '../assets/skills/postgresql.png';
import python from '../assets/skills/python.png';
import reactjs from '../assets/skills/reactjs.png';
import redis from '../assets/skills/redis.png';
import rubyOnRails from '../assets/skills/ruby-on-rails.png';
import ruby from '../assets/skills/ruby.png';
import spark from '../assets/skills/spark.png';
import vuejs from '../assets/skills/vuejs.png';

const skills = [ruby, python, javascript, nodejs, reactjs, vuejs, rubyOnRails, django, fastapi, nextjs, nuxtjs, expressjs, docker, kubernetes, kafka, elasticsearch, aws, github, mysql, postgresql, mongodb, redis, hadoop, spark];

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
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", p: "2px !important"}}>
          <Typography variant="h1" sx={{ color: "text.primary", mb: 4, maxWidth: "80%" }}>
            Get to&nbsp;
            <Typography component="span" variant="h1" color="primary.main" sx={{ fontWeight: "inherit" }}>
              Know Me.
            </Typography>
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: "1rem", color: "#555", mb: 2, maxWidth: "100%", textAlign: "left" }}>
            With over 17 years of experience in software development, I specialize in creating robust, scalable, and efficient systems tailored to client needs. My journey spans diverse domains, from startups to established enterprises, where I have led engineering teams, architected complex solutions, and delivered impactful products. Now, as a freelancer, I bring this expertise to help businesses of all sizes achieve their goals through innovative and reliable software solutions.
          </Typography>
        </Container>
      </Box>

      {/* Skills Section */}
      <Box sx={{ padding: 0, maxWidth: "100%", margin: "0 auto" }}>
        <Grid container spacing={0}>
          {/* Skills Section 1 */}
          <Grid item xs={12} md={6} sx={{pl: "0px !important", my: 0}}>
            <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: "1rem", color: "#555", mb: 2, px: 4, pt: 6 }}>
              I’m a Backend-Focused Developer with expertise in <b>Ruby</b>, <b>Python</b>, and <b>Node.js</b>, complemented by practical skills in Full-Stack Development using modern frameworks like <b>React.js</b> and <b>Vue.js</b>, alongside <b>HTML</b>, <b>CSS</b>, and <b>JavaScript</b>.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: "1rem", color: "#555", mb: 2, px: 4 }}>
              I’m a Backend-Focused Developer with expertise in <b>Ruby</b>, <b>Python</b>, and <b>Node.js</b>, complemented by practical skills in Full-Stack Development using modern frameworks like <b>React.js</b> and <b>Vue.js</b>, alongside <b>HTML</b>, <b>CSS</b>, and <b>JavaScript</b>.
            </Typography>
          </Grid>
          {/* Skills Logos */}
          <Grid item xs={12} md={6} sx={{pl: {xs: "0px !important"}}}>
            <LogoSlider logos={skills} rows={3} interval={9000} />
          </Grid>
        </Grid>
      </Box>

      <ThreeBoxContent sections={sections}/>

    </div>
  );
}