import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Grid, Divider } from '@mui/material';

// Content Import
import { allArticles } from '../../../.contentlayer/generated/index.mjs';

// Page Component Imports
import ArticleCard from '../../components/items/ArticleCard';

// Get the first 3 articles
const firstThreeArticles = allArticles.slice(0, 3);

export default function ArticleHighlights() {
  return (
    <Box sx={{ padding: 0 }}>
      {/* Articles Section */}
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 2,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Articles
          </Typography>
          <Button
            component={Link}
            to="/articles"
            variant="contained"
          >
            Browse All
          </Button>
        </Box>
        <Divider/>
        <Grid container spacing={2}>
          {firstThreeArticles.map((article, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              lg={3}
              key={article.slug}
              sx={{ pl: index === 0 ? '0px !important' : undefined }}
            >
              <ArticleCard
                article={article}
                onFocus={() => {}}
                onBlur={() => {}}
                focusedCardIndex={-1}
                cardIndex={index} // Pass the current index
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}