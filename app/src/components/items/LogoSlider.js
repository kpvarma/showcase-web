import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Carousel from 'react-material-ui-carousel';
import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const logoStyle = {
  height: '80px', // Fixed height
  objectFit: 'contain', // Maintain aspect ratio
  margin: '0 auto',
  transition: 'filter 0.3s ease-in-out', // Smooth transition for grayscale effect
};

function LogoSlider({ title, logos, rows = 1, interval = 5000 }) {
  // Calculate the number of logos per slide
  const columns = 3; // Fixed number of columns per row
  const logosPerSlide = rows * columns;

  // Group logos into slides based on the calculated number per slide
  const slides = [];
  for (let i = 0; i < logos.length; i += logosPerSlide) {
    slides.push(logos.slice(i, i + logosPerSlide));
  }

  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      {title && (
        <Typography
          component="p"
          variant="subtitle2"
          align="center"
          sx={{
            color: 'text.secondary',
            mb: 2,
            fontSize: { xs: '0.9rem', sm: '1rem' }, // Scale font size for mobile
          }}
        >
          {title}
        </Typography>
      )}
      <Carousel
        autoPlay
        interval={interval} // Customizable interval from props
        indicators={false}
        navButtonsAlwaysVisible
        animation="slide"
        navButtonsProps={{
          style: {
            backgroundColor: 'transparent', // Transparent background
            border: 'none', // No border
            boxShadow: 'none', // Remove shadow
          },
        }}
        navButtonsWrapperProps={{
          style: {
            top: '50%', // Vertically center the arrows
            transform: 'translateY(-50%)',
          },
        }}
        NextIcon={<ArrowForwardIosIcon fontSize="medium" sx={{ color: "#d7d7d7"}}/>} // Smaller arrow for mobile
        PrevIcon={<ArrowBackIosNewIcon fontSize="medium" sx={{ color: "#d7d7d7"}} />} // Smaller arrow for mobile
      >
        {slides.map((slide, slideIndex) => (
          <Box key={slideIndex} sx={{ py: { xs: 1, sm: 2 } }}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{
                px: { xs: 1, sm: 4 }, // Adjust padding for mobile
              }}
            >
              {slide.map((logo, index) => (
                <Grid
                  item
                  xs={12 / columns} // Dynamically set columns per row
                  sm={12 / columns} // Ensure proper sizing
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={logo}
                    alt={`Logo number ${slideIndex * logosPerSlide + index + 1}`}
                    style={{
                      ...logoStyle,
                      filter: 'grayscale(100%)', // Apply grayscale by default
                    }}
                    onMouseOver={(e) => (e.target.style.filter = 'none')} // Remove grayscale on hover
                    onMouseOut={(e) => (e.target.style.filter = 'grayscale(100%)')} // Apply grayscale on mouse out
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}

LogoSlider.propTypes = {
  title: PropTypes.string,
  logos: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.number, // Number of rows per slide
  interval: PropTypes.number, // Interval in milliseconds
};

export default LogoSlider;