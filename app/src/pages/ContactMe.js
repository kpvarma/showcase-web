import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';

const HireMe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., API call)
    console.log('Form submitted:', formData);
    setOpenSnackbar(true);
    setFormData({ name: '', email: '', message: '', company: '' });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h3" gutterBottom>
        Hire Me
      </Typography>
      <Typography variant="body1" paragraph>
        Interested in working with me? Fill out the form below, and I'll get back to you as soon as possible!
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <TextField
          label="Your Name"
          variant="outlined"
          fullWidth
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Your Email"
          variant="outlined"
          fullWidth
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Your Company (Optional)"
          variant="outlined"
          fullWidth
          name="company"
          value={formData.company}
          onChange={handleInputChange}
        />
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          multiline
          rows={4}
          required
        />
        <Grid container justifyContent="flex-end">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Thank you for reaching out! I'll get back to you soon.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HireMe;