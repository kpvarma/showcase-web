import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

const MetaTags = ({ title, description, url, image }) => {
  // Default values
  const defaultTitle = 'kpvarma.com | My experiments with tech';
  const defaultDescription = 'kpvarma.com | A platform where I experiment with the latest technologies and share my learnings.';
  const defaultImage = '/assets/images/logo.png';
  const defaultDomain = 'https://www.kpvarma.com';

  // Helper function to ensure the URL includes the domain
  const ensureDomain = (path) => {
    if (!path) return defaultDomain; // Return default domain if path is empty
    const isFullDomain = path.startsWith('http') || path.startsWith('www.') || path.includes(defaultDomain.replace('https://', '')); // Check if path is a valid full domain
    return isFullDomain ? (path.startsWith('http') ? path : `https://${path}`) : `${defaultDomain}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  // Use default values if props are empty or undefined
  const finalTitle = title ? `${title} | kpvarma.com` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image || defaultImage;
  const finalUrl = ensureDomain(url);

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