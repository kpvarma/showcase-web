import React from 'react';

const AudioPlayer = ({ url }) => {
  return (
    <audio controls style={{ width: '100%' }}>
      <source src={url} type="audio/ogg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;