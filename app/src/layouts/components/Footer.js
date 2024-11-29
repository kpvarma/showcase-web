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
        <Box
          sx={{
            display: 'flex',
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
              
              <Typography
                variant="body2"
                gutterBottom
                sx={{ fontWeight: 600, mt: 2 }}
              >
                An Engineer, crafting solutions through code.
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
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              VarmaLabs
            </Typography>
            <Link color="text.secondary" variant="body2" href="/projects">
              Projects
            </Link>
            <Link color="text.secondary" variant="body2" href="/articles">
              Articles
            </Link>
            <Link color="text.secondary" variant="body2" href="/repository_links">
              Respository Links
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
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
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: { xs: 4, sm: 8 },
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
      </Container>
    </React.Fragment>
  );
}
