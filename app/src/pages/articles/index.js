// General Imports
import * as React from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

// UI Imports
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// Page Component Imports
import ArticleCard from '../../components/items/ArticleCard';

// Content Import
import { allArticles } from '../../../.contentlayer/generated/index.mjs';

export default function ArticlesIndex() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [filteredArticles, setFilteredArticles] = useState(allArticles);

  // Extract unique tags
  const tags = [
    'All',
    ...new Set(allArticles.flatMap((article) => article.tags)),
  ];

  const filterArticles = (tag) => {
    setSelectedTag(tag);
    if (tag === 'All') {
      setFilteredArticles(allArticles);
    } else {
      setFilteredArticles(
        allArticles.filter((article) => article.tags.includes(tag))
      );
    }
  };

  // Responsive handling
  const isMobile = window.innerWidth <= 600;

  return (
    <div>
      <Helmet>
        <title>Articles | Varma Labs - My experiement with tech</title>
        <meta name="description" content='' />
      </Helmet>
      <Box sx={{ maxWidth: '1200px', margin: '0 left', padding: '16px' }}>
        {/* Heading and Description */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h1" sx={{ color: "text.primary" }} gutterBottom>
            Articles
          </Typography>
          <Typography sx={{ color: "text.primary" }}>From Concepts to Code: My Experimental Articles</Typography>
        </Box>

        {/* Main Layout */}
        <Grid container spacing={2} sx={{ margin: 0, width: '100%' }}>
          {/* Sidebar or Dropdown */}
          {isMobile ? (
            <Grid item xs={12} sx={{}}>
              <Select
                value={selectedTag}
                onChange={(e) => filterArticles(e.target.value)}
                fullWidth
                displayEmpty
                sx={{
                  backgroundColor: '#f9f9f9',
                  borderRadius: 1,
                  mb: 2,
                }}
              >
                {tags.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    {tag}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          ) : (
            <Grid item xs={12} sm={2} sx={{ paddingLeft: '0px !important' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ color: "text.primary" }}>
                  Filter by Tags
                </Typography>
                {tags.map((tag) => (
                  <Box
                    key={tag}
                    onClick={() => filterArticles(tag)}
                    sx={{
                      fontSize: '1rem',
                      cursor: 'pointer',
                      textDecoration: selectedTag === tag ? 'underline' : 'none',
                      color:
                        selectedTag === tag ? 'primary.main' : 'text.secondary',
                      '&:hover': { color: 'primary.dark' },
                    }}
                  >
                    {tag}
                  </Box>
                ))}
              </Box>
            </Grid>
          )}

          {/* Articles */}
          <Grid item xs={12} sm={isMobile ? 12 : 10} sx={{ paddingLeft: isMobile ? '0px' : '0px' }}>
            {/* Articles Grid */}
            <Grid container spacing={2}>
              {filteredArticles.map((article, index) => (
                <Grid item xs={12} sm={6} md={4} key={article.slug} sx={{ paddingLeft: index % 3 === 0 ? '0px !important' : undefined }}>
                  <ArticleCard
                    article={{
                      ...article,
                      publishedDate: article.date,
                      lastModified: article.lastmod || article.date,
                    }}
                    onFocus={() => {}}
                    onBlur={() => {}}
                    focusedCardIndex={-1}
                    cardIndex={index}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}