import React from 'react';
import Grid from '@mui/material/Grid';
import PlaylistCard from "./PlaylistCard"

const playlistData = [
  {
      "name": "KramaKali",
      "description": "KramaKali description",
      "playlistName": "Tantra",
      "tags": ["Tathagatha", "R Ramanand"]
  },
  {
      "name": "Bhoota Shudhi Class",
      "description": "KramaKali description",
      "playlistName": "Tantra",
      "tags": ["BDPS", "Sreenath Ji"]
  },
  {
    "name": "ABC News Youtube Channel",
    "description": "T.G Mohandas, Ramachandran, Sunil, A.P Ahmed",
    "playlistName": "Kerala Politics",
    "tags": ["Kerala", "Politics", "ABC News"]
},
{
    "name": "Manorama Live",
    "description": "Manorama Live Youtube Channel",
    "playlistName": "Kerala Politics",
    "tags": ["Kerala", "Politics", "Manorama"]
}
]

const linkData = [
  {
    title: 'Card 1',
    description: 'This is a card.',
    type: 'Podcast',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    title: 'Card 2',
    description: 'This is another card.',
    type: 'Music',
    imageUrl: 'https://via.placeholder.com/150',
  },
  // Add more card data as needed
];

const ShowCase = () => (
  <Grid container spacing={2}>
    {playlistData.map((data, index) => (
      <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
        {/* Center the PlaylistCard component */}
        <div style={{ width: '100%', maxWidth: 360 }}>
          <PlaylistCard data={data} />
        </div>
      </Grid>
    ))}
  </Grid>
);

export default ShowCase;
