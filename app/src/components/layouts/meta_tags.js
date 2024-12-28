import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

const MetaTags = ({ title, description, url, image }) => {
  // Default values
  const defaultTitle = 'kpvarma.com | My experiments with tech';
  const defaultDescription = 'kpvarma.com | A platform where I experiment with the latest technologies and share my learnings.';
  const defaultDomain = 'https://www.kpvarma.com';
  const defaultImage = `${defaultDomain}/assets/images/logo.png`;

  // Helper function to ensure the URL includes the domain
  const ensureDomain = (path) => {
    if (!path) return defaultDomain; // Return default domain if path is empty
    const isFullDomain = path.startsWith('http') || path.startsWith('www.') || path.includes(defaultDomain.replace('https://', '')); // Check if path is a valid full domain
    return isFullDomain ? (path.startsWith('http') ? path : `https://${path}`) : `${defaultDomain}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  // Use default values if props are empty or undefined
  const finalTitle = title ? `${title} || kpvarma.com` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image ? ensureDomain(image) : defaultImage;
  const finalUrl = ensureDomain(url);

  console.log("title: ", title);
  console.log("description: ", description);
  console.log("image: ", image);
  console.log("url: ", url);

  console.log("finalTitle: ", finalTitle);
  console.log("finalDescription: ", finalDescription);
  console.log("finalImage: ", finalImage);
  console.log("finalUrl: ", finalUrl);
  
  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
    </Helmet>
  );
};

MetaTags.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
};

export default MetaTags;