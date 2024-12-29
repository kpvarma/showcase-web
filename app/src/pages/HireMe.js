import React, { useState } from "react";

// UI Imports
import { Box, Grid, Typography, TextField, Button, Alert } from "@mui/material";

// Utility Imports
import { useForm, ValidationError } from "@formspree/react";

// Page Component Imports
import imageLibrary from "../components/utils/image_library";
import MetaTags from '../components/layouts/meta_tags'

export default function Contact() {
  const [state, handleSubmit] = useForm("mwpkjzkw");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      {/* <MetaTags
        title={`About Me`}
        url={'/aboutme'}
      /> */}
      <Box sx={{ maxWidth: '1200px', margin: '0 left', padding: '16px' }}>
        {/* Heading and Description */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h2" sx={{ color: "text.primary", mb: 2 }}>
            Let me&nbsp;
            <Typography component="span" variant="h2" color="primary.main" sx={{ fontWeight: "inherit", p: "0px !important" }}>
              work for you
            </Typography>
          </Typography>
          <Typography sx={{ color: "text.primary" }}>Interested in working with me? Fill out the form below, and
          I'll get back to you as soon as possible!</Typography>
        </Box>
      </Box>
      
      <Grid container spacing={0} alignItems="flex-start" sx={{mb: {xs: 40, sm: 20}}}>
        {/* Left Grid: Form or Response Message */}
        <Grid item xs={12} md={6} sx={{pl: "0px !important"}}>
          {!state.succeeded ? (
            <Box sx={{py: 4, pr: 4}}>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 3 }}
              >
                <TextField
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  variant="filled"
                  fullWidth
                  required
                />
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="filled"
                  fullWidth
                  required
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />

                <TextField
                  label="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  variant="filled"
                  fullWidth
                  required
                />
                <ValidationError
                  prefix="Company"
                  field="company"
                  errors={state.errors}
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
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
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
                  disabled={state.submitting}
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
              <Grid container spacing={2} direction="column" sx={{ position: "relative" }}>
                <Grid item>
                  <Box 
                    component="img" 
                    src={imageLibrary.hireme1} 
                    alt="HireMe" 
                    sx={{ 
                      width: { xs: "40%", md: "70%" }, 
                      borderRadius: "8px", 
                      boxShadow: 2, 
                      position: "absolute", 
                      transform: { xs: "rotate(-3deg)", md: "rotate(-5deg)" }, 
                      zIndex: 3, 
                      top: { xs: "5%", md: "0" }, 
                      left: { xs: "10%", md: "0" } 
                    }} 
                  />
                </Grid>
                <Grid item>
                  <Box 
                    component="img" 
                    src={imageLibrary.hireme3} 
                    alt="HireMe" 
                    sx={{ 
                      width: { xs: "40%", md: "70%" }, 
                      borderRadius: "8px", 
                      boxShadow: 2, 
                      position: "absolute", 
                      transform: { xs: "rotate(3deg)", md: "rotate(5deg)" }, 
                      top: { xs: "15%", md: "40vh" }, 
                      left: { xs: "20%", md: "30px" }, 
                      zIndex: 2 
                    }} 
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* Second Column: Image 3 spanning the height of both */}
            <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "stretch", position: "relative" }}>
              <Box 
                component="img" 
                src={imageLibrary.hireme2} 
                alt="HireMe" 
                sx={{ 
                  display: { xs: 'none', sm: 'block'},
                  width: { xs: "40%", md: "80%" }, 
                  borderRadius: "8px", 
                  boxShadow: 2, 
                  objectFit: "cover", 
                  transform: { xs: "rotate(-2deg)", md: "rotate(-3deg)" }, 
                  zIndex: 1, 
                  top: { xs: "10%", md: "0" }, 
                  left: { xs: "15%", md: "0" }, 
                  position: "absolute" 
                }} 
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}