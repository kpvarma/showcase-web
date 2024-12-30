import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

// UI Imports
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
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';

// Asset Imports
import imageLibrary from '../../components/utils/image_library';

const buttons = {
  "/": "Home",
  "/demos/": "Demos",
  "/projects/": "Projects",
  "/articles/": "Articles",
  "/aboutme/": "About Me",
};


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
  const location = useLocation();

  // Function to check if the current path matches a given pattern
  const isActive = (pattern) => {
    if (pattern === "/") {
      return location.pathname === "/"; // Only highlight "Home" for exact matches
    }
    return location.pathname.startsWith(pattern); // Highlight others for nested paths
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
            <Link to="/" style={{ color: '#00bcd4', textDecoration: 'none', fontWeight: 'bold',}} >
              <img src={imageLibrary.getLogoImage()} alt="kpvarma.com Logo" style={{ margin: '0px', padding: '2px', height: 'auto', width: 'auto', maxHeight: '36px',}} />
            </Link>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 2 }}>
              {Object.entries(buttons).map(([path, text], idx) => (
                <Button
                  key={idx}
                  variant="text"
                  size="small"
                  href={path}
                  sx={{
                    fontSize: '1.0em',
                    color: isActive(path) ? 'primary.main' : 'gray',
                    fontWeight: isActive(path) ? 'bold' : 'normal',
                    border: isActive(path) ? '0px solid' : 'none',
                    borderColor: isActive(path) ? 'primary.main' : 'transparent',
                    borderRadius: 1,
                    m: '0px 5px',
                    padding: '4px 12px',
                    '&:hover': {
                      color: 'primary.main',
                      border: '0px solid',
                      borderColor: 'primary.main',
                    },
                  }}>
                  {text}
                </Button>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            <Button color="secondary" variant="contained" size="small" href="/hireme">
              Hire Me
            </Button>
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)} PaperProps={{ sx: { top: 'var(--template-frame-height, 0px)', }, }}>
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                {Object.entries(buttons).map(([path, text], idx) => (
                  <MenuItem
                    key={idx}
                    component={Link}
                    to={path}
                    onClick={toggleDrawer(false)}
                    sx={{
                      fontSize: '1.0em',
                      color: isActive(`^${path}(/[^/]+)?$`) ? 'primary.main' : 'gray',
                      fontWeight: isActive(`^${path}(/[^/]+)?$`) ? 'bold' : 'normal',
                      border: isActive(`^${path}(/[^/]+)?$`) ? '1px solid' : 'none',
                      borderColor: isActive(`^${path}(/[^/]+)?$`) ? 'primary.main' : 'transparent',
                      borderRadius: 1,
                      padding: '4px 8px',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'primary.main',
                        border: '1px solid',
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    {text}
                  </MenuItem>
                ))}
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button color="secondary" variant="contained" fullWidth href="/hireme">
                    Hire Me
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}