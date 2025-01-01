import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const MetaTags = ({ title, description, url, image }) => {
  const defaultTitle = 'kpvarma.com - My experiments with tech';
  const defaultDescription = 'A platform where I experiment with the latest technologies and share my learnings.';
  const defaultDomain = 'https://www.kpvarma.com';
  const defaultImage = `${defaultDomain}/assets/images/logo.png`;

  const ensureDomain = (path) => {
    if (!path) return defaultDomain;
    const isFullDomain = path.startsWith('http') || path.startsWith('www.') || path.includes(defaultDomain.replace('https://', ''));
    return isFullDomain ? (path.startsWith('http') ? path : `https://${path}`) : `${defaultDomain}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  const finalTitle = title ? `${title} | kpvarma.com` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image ? ensureDomain(image) : defaultImage;
  const finalUrl = ensureDomain(url);

  useEffect(() => {
    const updateMetaTag = (id, content) => {
      const tag = document.getElementById(id);
      if (tag) {
        tag.setAttribute('content', content);
      }
    };

    document.title = finalTitle;

    updateMetaTag('meta-title', finalTitle);
    updateMetaTag('meta-description', finalDescription);
    updateMetaTag('og-title', finalTitle);
    updateMetaTag('og-description', finalDescription);
    updateMetaTag('og-image', finalImage);
    updateMetaTag('og-url', finalUrl);
    updateMetaTag('twitter-title', finalTitle);
    updateMetaTag('twitter-description', finalDescription);
    updateMetaTag('twitter-image', finalImage);
  }, [finalTitle, finalDescription, finalImage, finalUrl]);

  return null;
};

MetaTags.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
};

export default MetaTags;