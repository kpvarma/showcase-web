import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';

const logoStyle = {
  width: '100px',
  height: '80px',
  margin: '0 32px',
  opacity: 0.7,
};

function LogoCollection({ title, whiteLogos, darkLogos }) {
  const theme = useTheme();
  const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;

  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      {title && (
        <Typography
          component="p"
          variant="subtitle2"
          align="center"
          sx={{ color: 'text.secondary', mb: 2 }}
        >
          {title}
        </Typography>
      )}
      <Grid container sx={{ justifyContent: 'center', mt: 0.5, opacity: 0.6 }}>
        {logos.map((logo, index) => (
          <Grid item key={index}>
            <img
              src={logo}
              alt={`Logo number ${index + 1}`}
              style={logoStyle}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

LogoCollection.propTypes = {
  title: PropTypes.string,
  whiteLogos: PropTypes.arrayOf(PropTypes.string).isRequired,
  darkLogos: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default LogoCollection;