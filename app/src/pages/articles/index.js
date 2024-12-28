// General Imports
import * as React from 'react';
import { useEffect, useState } from 'react';

// UI Imports
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Page Component Imports
// import ArticleCard from '../../components/items/ArticleCard';
import ArticlePreview from '../../components/items/ArticlePreview';
import MetaTags from '../../components/layouts/meta_tags'

// Content Import
import { allArticles } from '../../../.contentlayer/generated/index.mjs';

export default function ArticlesIndex() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [filteredArticles, setFilteredArticles] = useState(allArticles);

  // Responsive handling
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Extract unique tags
  const tags = [
    'All',
    ...new Set(allArticles.filter((article) => article.draft === false).flatMap((article) => article.tags)),
  ];

  const filterArticles = (tag = 'All') => {
    setSelectedTag(tag);
  
    // Step 1: Ignore all drafts
    let filteredArticles = allArticles.filter((article) => !article.draft);
  
    // Step 2: Filter by tag
    if (tag !== 'All') {
      filteredArticles = filteredArticles.filter((article) => article.tags.includes(tag));
    }

    // Step 3: Sort by score (featured status and then by reverse chronological order)
    filteredArticles = filteredArticles.sort((a, b) => b.score - a.score);
  
    // Step 4: Update the state
    setFilteredArticles(filteredArticles);
  };

  useEffect(() => {
      filterArticles('All'); // Call the filtering function on page load
    }, []); // Empty dependency array ensures it runs only once

  return (
    <div>
      <MetaTags
        title={`Articles`}
        description={'kpvarma.com | My Articles - where I experiment with the latest technologies and share my learnings.'}
        url={'/articles'}
      />
      {/* Heading and Description */}
      <Typography variant="h2" sx={{ color: "text.primary", mb: 2 }}>
        Browse&nbsp;
        <Typography component="span" variant="h2" color="primary.main" sx={{ fontWeight: "inherit", p: "0px !important" }}>
          Articles
        </Typography>
      </Typography>
      <Typography sx={{ color: "text.primary" }}>From Concepts to Code: My Experimental Articles</Typography>
      
      {/* Main Layout */}
      <Grid container spacing={0} sx={{ width: '100%', mt: 4 }}>
        {/* Sidebar or Dropdown */}
        {isMobile ? (
          <Grid item xs={12} sx={{}}>
            <Select
              value={selectedTag} onChange={(e) => filterArticles(e.target.value)} fullWidth displayEmpty
              sx={{ backgroundColor: '#f9f9f9', borderRadius: 1, mb: 2, }} >
              {tags.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        ) : (
          <Grid item xs={12} sm={2} sx={{ pl: '0px !important' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1,}}>
              <Typography variant="h6" gutterBottom sx={{ color: "text.primary" }}>
                Filter by Tags
              </Typography>
              {tags.map((tag) => (
                <Box
                  key={tag} onClick={() => filterArticles(tag)}
                  sx={{ fontSize: '1rem', cursor: 'pointer', textDecoration: selectedTag === tag ? 'underline' : 'none',
                    color: selectedTag === tag ? 'primary.main' : 'text.secondary', '&:hover': { color: 'primary.dark' }, }}>
                  {tag}
                </Box>
              ))}
            </Box>
          </Grid>
        )}

        {/* Articles Grid */}
        <Grid item xs={12} sm={isMobile ? 12 : 10} sx={{ pl: isMobile ? '0px' : '0px', mb: 10 }}>
          {/* <Grid container spacing={0}>
            {filteredArticles.map((article, index) => (
              <Grid item xs={12} sm={6} md={4} key={article.slug} sx={{ paddingLeft: index % 3 === 0 ? '0px !important' : undefined }}>
                <Box sx={{p: 1}}>
                  <ArticleCard article={article} onFocus={() => {}} onBlur={() => {}} focusedCardIndex={-1} cardIndex={index} />
                </Box>
              </Grid>
            ))}
          </Grid> */}
          {filteredArticles.map((article, index) => (
            <ArticlePreview key={article.slug} article={article} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}