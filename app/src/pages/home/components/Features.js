import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// Components
import FeaturedProjects from '../../../components/items/FeaturedProjects';
import FeaturedArticles from '../../../components/items/FeaturedArticles';

export default function Features() {
  return (
    <Container sx={{my: { xs: 20, md: 10 }}}>
      <Box sx={{ width: { sm: '100%', md: '100%'}, textAlign: 'center' }}>
        <Typography component="h2" variant="h4" gutterBottom sx={{ color: 'text.primary' }} >
          Browse my Projects & Articles
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 } }}>
        Dive into a showcase of my projects, including cutting-edge machine learning demos, data science utilities, and client success stories with visuals. Explore my blog for tech insights and discoveries.
        </Typography>
      </Box>
      <Grid container spacing={0} sx={{ maxWidth: "100%", margin: {xs: "0 auto", md: "0 auto"} }}>
        <Grid item xs={12} md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            justifyContent: "center",
            textAlign: { xs: "center", md: "left" },
            height: '100%',
            marginTop: { xs: 0, md: 0 },
            marginBottom: { xs: 0, md: 0 },
          }}
        >
          <FeaturedProjects/>
        </Grid>
        <Grid item xs={12} md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            justifyContent: "center",
            textAlign: { xs: "center", md: "left" },
            marginTop: { xs: 5, md: 0 },
            marginBottom: { xs: 0, md: 0 },
          }}
        >
          <FeaturedArticles no_of_articles={4}/>
        </Grid>
      </Grid>
    </Container>
  );
}