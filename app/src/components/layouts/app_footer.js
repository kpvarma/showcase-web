import * as React from 'react';
import { Link as DefaultLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CodeIcon from '@mui/icons-material/Code';
import logo from '../../assets/logo.png';

import HireMeSection from './hire_me_footer';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link color="text.secondary" href="/">
        VarmaLabs
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <React.Fragment>
      <Divider />
      <HireMeSection />
      <Divider />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        
        {/* Logo & Footer Links for Desktop */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: { xs: '100%', sm: '60%' },
            }}
          >
            <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
              <DefaultLink
                to="/"
                style={{
                  color: '#00bcd4',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                <img
                  src={logo}
                  alt="Varma Labs Logo"
                  style={{
                    margin: '3px',
                    padding: '3px',
                    height: 'auto',
                    width: 'auto',
                    maxHeight: '50px',
                  }}
                />
              </DefaultLink>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                An Engineer, crafting solutions through code. asd
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
              VarmaLabs
            </Typography>
            <Link color="text.secondary" variant="body2" href="/projects">
              Projects
            </Link>
            <Link color="text.secondary" variant="body2" href="/articles">
              Articles
            </Link>
            {/* <Link color="text.secondary" variant="body2" href="/repository_links">
              Respository Links
            </Link> */}
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
              About Me
            </Typography>
            <Link color="text.secondary" variant="body2" href="/AboutMe">
              My Profile
            </Link>
            <Link color="text.secondary" variant="body2" href="https://www.linkedin.com/in/krishnaprasadvarma" target="_blank">
              My LinkedIn
            </Link>
            <Link color="text.secondary" variant="body2" href="https://github.com/kpvarma" target="_blank">
              My Github
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
              Reach Me
            </Typography>
            <Link color="text.secondary" variant="body2" href="/hireme">
              Contact Me
            </Link>
            <Link color="text.secondary" variant="body2" href="/hireme">
              Hire Me
            </Link>
          </Box>
        </Box>
        
        {/* Social Media and Copyright for Desktop */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            justifyContent: 'space-between',
            pt: { xs: 4, sm: 4 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <div>
            {/* <Link color="text.secondary" variant="body2" href="#">
              Privacy Policy
            </Link>
            <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
              &nbsp;•&nbsp;
            </Typography>
            <Link color="text.secondary" variant="body2" href="#">
              Terms of Service
            </Link> */}
            <Copyright />
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              Crafted with passion, using <strong>React.js</strong>, <strong>Contentlayer</strong>, <strong>Django</strong>, and <strong>MongoDB</strong>.
            </Typography>
          </div>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ justifyContent: 'left', color: 'text.secondary' }}
          >
            <IconButton
              color="inherit"
              size="small"
              href="https://github.com/kpvarma"
              aria-label="GitHub"
              target="_blank"
              sx={{ alignSelf: 'center' }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              href="https://www.kaggle.com/kpvarma27"
              aria-label="Kaggle"
              target="_blank"
              sx={{ alignSelf: 'center' }}
            >
              <CodeIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              href="https://www.linkedin.com/in/krishnaprasadvarma"
              aria-label="LinkedIn"
              target="_blank"
              sx={{ alignSelf: 'center' }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
        
        {/* Logo for Mobile */}
        <Box
          sx={{
            display: {xs: 'flex', sm: 'none'},
            flexDirection: 'column',
            gap: 1.5,
            alignItems: { xs: 'center', sm: 'flex-start' },
            width: '100%',
          }}
        >
          <DefaultLink
            to="/"
            style={{
              color: '#00bcd4',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            <img
              src={logo}
              alt="Varma Labs Logo"
              style={{
                margin: '3px',
                padding: '3px',
                height: 'auto',
                width: 'auto',
                maxHeight: '50px',
              }}
            />
          </DefaultLink>
          <Typography
            variant="body2"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 1,
              mb: 2, // Reduce spacing between logo and text
              color: 'text.secondary',
              maxWidth: { xs: '80%', sm: '100%' },
            }}
          >
            An Engineer, crafting solutions through code.
          </Typography>
        </Box>

        {/* Footer Links for Mobile */}
        <Box
          sx={{
            display: { xs: 'grid', sm: 'none' },
            gridTemplateColumns: '1fr 1fr', // Two columns
            gap: 1.5, // Space between items
            justifyItems: 'center', // Center items horizontally
            alignItems: 'center', // Center items vertically
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Link color="text.secondary" variant="body2" href="/projects">
            Projects
          </Link>
          <Link color="text.secondary" variant="body2" href="/aboutme">
            About Me
          </Link>
          <Link color="text.secondary" variant="body2" href="/articles">
            Articles
          </Link>
          <Link
            color="text.secondary"
            variant="body2"
            href="https://www.linkedin.com/in/krishnaprasadvarma"
            target="_blank"
          >
            My LinkedIn
          </Link>
          {/* <Link color="text.secondary" variant="body2" href="/repository_links">
            Repository Links
          </Link> */}
          {/* <Link color="text.secondary" variant="body2" href="/AboutMe">
            My Profile
          </Link> */}
          <Link color="text.secondary" variant="body2" href="/hireme">
            Hire Me
          </Link>
          <Link
            color="text.secondary"
            variant="body2"
            href="https://github.com/kpvarma"
            target="_blank"
          >
            My Github
          </Link>
        </Box>

        {/* Social Media and Copyright for Mobile */}
        <Box
          sx={{
            display: {xs: 'flex', sm: 'none'},
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
            pt: { xs: 4, sm: 8 },
          }}
        >
          <Copyright />
          <Stack
            direction="row"
            spacing={1}
            sx={{
              justifyContent: 'center',
              color: 'text.secondary',
              mt: 2, // Margin top for social media icons
            }}
          >
            <IconButton
              color="inherit"
              size="small"
              href="https://github.com/kpvarma"
              aria-label="GitHub"
              target="_blank"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              href="https://www.kaggle.com/kpvarma27"
              aria-label="Kaggle"
              target="_blank"
            >
              <CodeIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              href="https://www.linkedin.com/in/krishnaprasadvarma"
              aria-label="LinkedIn"
              target="_blank"
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>

      </Container>
    </React.Fragment>
  );
}
