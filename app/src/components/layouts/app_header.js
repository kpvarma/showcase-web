import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import logo from '../../assets/logo.png';
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function Header() {
  const [open, setOpen] = React.useState(false);

  // Function to check if the current path matches a given pattern
  const isActive = (pattern) => {
    const regex = new RegExp(pattern, 'i'); // 'i' for case-insensitive match
    return regex.test(location.pathname);
  };
  
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
          
            <Link
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
                  margin: '0px',
                  padding: '2px',
                  height: 'auto',
                  width: 'auto',
                  maxHeight: '36px',
                }}
              />
            </Link>
          
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" size="small" href="/projects" sx={{ color: isActive("^/projects(/[^/]+)?$") ? '#0275da' : 'gray', fontWeight: isActive("^/projects(/[^/]+)?$") ? 'bold' : 'normal', }} > Projects </Button>
              <Button variant="text" size="small" href="/articles" sx={{ color: isActive("^/articles(/[^/]+)?$") ? '#0275da' : 'gray', fontWeight: isActive("^/articles(/[^/]+)?$") ? 'bold' : 'normal', }}> Articles </Button>
              <Button variant="text" size="small" href="/aboutme" sx={{ color: isActive("^/aboutme") ? '#0275da' : 'gray', fontWeight: isActive("^/aboutme") ? 'bold' : 'normal', }} > About Me </Button>
              <Button variant="text" size="small" href="/testpage" sx={{ color: isActive("^/testpage") ? '#0275da' : 'gray', fontWeight: isActive("^/testpage") ? 'bold' : 'normal', }} > Test Page </Button>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center', }}>
            <Button color="secondary" variant="contained" size="small" href="/hireme"> Hire Me </Button>
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: {xs: 'flex', md: 'none'}, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem component={Link} to="/projects" onClick={toggleDrawer(false)} // Close the menu
                  sx={{
                    color: isActive("^/projects(/[^/]+)?$") ? '#0275da' : 'gray',
                    fontWeight: isActive("^/projects(/[^/]+)?$") ? 'bold' : 'normal',
                    textDecoration: 'none',
                    '&:hover': { color: '#0275da' },
                  }} > Projects </MenuItem>
                <MenuItem component={Link} to="/articles" onClick={toggleDrawer(false)} // Close the menu
                  sx={{
                    color: isActive("^/articles(/[^/]+)?$") ? '#0275da' : 'gray',
                    fontWeight: isActive("^/articles(/[^/]+)?$") ? 'bold' : 'normal',
                    textDecoration: 'none',
                    '&:hover': { color: '#0275da' },
                  }} > Articles </MenuItem>
                <MenuItem component={Link} to="/aboutme" onClick={toggleDrawer(false)} // Close the menu
                  sx={{
                    color: isActive("^/aboutme$") ? '#0275da' : 'gray',
                    fontWeight: isActive("^/aboutme$") ? 'bold' : 'normal',
                    textDecoration: 'none',
                    '&:hover': { color: '#0275da' },
                  }} > About Me </MenuItem>
                <MenuItem component={Link} to="/testpage" onClick={toggleDrawer(false)} // Close the menu
                  sx={{
                    color: isActive("^/testpage$") ? '#0275da' : 'gray',
                    fontWeight: isActive("^/testpage$") ? 'bold' : 'normal',
                    textDecoration: 'none',
                    '&:hover': { color: '#0275da' },
                  }} > Test Page </MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem><Button color="primary.main" variant="contained" fullWidth href="/hireme"> Hire Me </Button></MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
