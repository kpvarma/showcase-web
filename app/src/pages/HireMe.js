import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';

import { Box, Grid, Typography, TextField, Button, Alert } from "@mui/material";
import axios from "axios";

import hireme1Image from "../assets/hireme3.png";
import hireme2Image from "../assets/hireme1.png";
import hireme3Image from "../assets/hireme2.png";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organisation: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    if (!formData.organisation.trim()) errors.organisation = "Organisation is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        await axios.post("https://myapi.com/hireme/submit", formData);
        setFormSubmitted(true);
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>Hire Me | Varma Labs - My experiement with tech</title>
        <meta name="description" content='' />
      </Helmet>
      <Box id="contact" sx={{ padding: "70px 20px" }}>
        <Grid container spacing={4} alignItems="flex-start">
          {/* Left Grid: Form or Response Message */}
          <Grid item xs={12} md={6}>
            {!formSubmitted ? (
              <Box>
                {/* Title and Description */}
                <Typography variant="h3" gutterBottom>
                  Let me work for you
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "16px", lineHeight: 1.6, marginBottom: 3 }}>
                  Interested in working with me? Fill out the form below, and I'll get back to you as soon as
                  possible!
                </Typography>
                {/* Form */}
                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <TextField
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    variant="filled"
                    fullWidth
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                    required
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    variant="filled"
                    fullWidth
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    type="email"
                    required
                  />
                  <TextField
                    label="Organisation"
                    name="organisation"
                    value={formData.organisation}
                    onChange={handleInputChange}
                    variant="filled"
                    fullWidth
                    error={!!formErrors.organisation}
                    helperText={formErrors.organisation}
                  />
                  <TextField
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    variant="filled"
                    fullWidth
                    multiline
                    rows={4}
                    required
                  />
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{
                      backgroundColor: "#0275da",
                      color: "#fff", // Set text color to white
                      ":hover": {
                        backgroundColor: "#0e599b",
                        color: "#fff", // Ensure text stays white on hover
                      },
                      borderColor: "#0275da", // Maintain consistent border color for outlined variant
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box>
                <Alert severity="success">
                  Thank you for filling up the form. I shall get back to you at the earliest.
                </Alert>
              </Box>
            )}
          </Grid>

          {/* Right Grid: Images */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {/* First Column: Images 1 and 2 */}
              <Grid item xs={12} md={6}>
                <Grid container spacing={2} direction="column">
                  <Grid item>
                    <Box
                      component="img"
                      src={hireme1Image}
                      alt="HireMe"
                      sx={{
                        width: "100%",
                        borderRadius: "8px",
                        boxShadow: 2,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Box
                      component="img"
                      src={hireme2Image}
                      alt="HireMe"
                      sx={{
                        width: "100%",
                        borderRadius: "8px",
                        boxShadow: 2,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Second Column: Image 3 spanning the height of both */}
              <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "stretch" }}>
                <Box
                  component="img"
                  src={hireme3Image}
                  alt="HireMe"
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px",
                    boxShadow: 2,
                    objectFit: "cover", // Ensures the image maintains aspect ratio
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}