import fs from 'fs';
import path from 'path';
import { allArticles, allProjects, allDemos } from './.contentlayer/generated/index.mjs';
import imageLibrary from './src/components/utils/image_library.js';
import metaTagData from './meta_tag_data.js';

// Load `index.html` template from the public folder
const templatePath = path.resolve('public', 'index.html');
const template = fs.readFileSync(templatePath, 'utf-8');

// Default Values
const defaultTitle = 'K.P. Varma - An Engineer, empowering ideas and crafting solutions through code';
const defaultDescription = 'Dive into my journey of building impactful solutions and exploring cutting-edge technologies.';
const defaultDescription2 = 'A platform where I experiment with the latest technologies and share my learnings.';
const defaultDomain = 'https://www.kpvarma.com';
const defaultImage = `${defaultDomain}/assets/link-previews/aboutme.png`;

// Utility to ensure full domain in URLs
const ensureDomain = (path) => {
  if (!path) return defaultDomain;
  const isFullDomain = path.startsWith('http') || path.startsWith('www.') || path.includes(defaultDomain.replace('https://', ''));
  return isFullDomain ? (path.startsWith('http') ? path : `https://${path}`) : `${defaultDomain}${path.startsWith('/') ? '' : '/'}${path}`;
};

// Function to generate static HTML for a route
const generateStaticHtml = (dataType, data, outputDir) => {
  let url;
  let image;

  switch (dataType) {
    case 'project':
      url = `/projects/${data.slug}`;
      image = imageLibrary.getProjectImage(data.cover_image);
      break;
    case 'demo':
      url = `/demos/${data.slug}`;
      image = imageLibrary.getDemoImage(data.cover_image);
      break;
    case 'article':
      url = `/articles/${data.slug}`;
      image = imageLibrary.getArticleImage(data.cover_image);
      break;
    case 'page':
      url = data.url;
      image = data.image;
      break;
    default:
      console.error('Unknown data type:', dataType);
      break;
  }

  // Default values
  const finalTitle = data.title ? `${data.title} | kpvarma.com` : defaultTitle;
  const finalDescription = data.description || defaultDescription;
  const finalImage = image ? ensureDomain(image) : defaultImage;
  const finalUrl = ensureDomain(url);

  // Replace placeholders in the template
  const htmlContent = template
    .replace('__PAGE_TITLE__', finalTitle)
    .replace('__OG_DESCRIPTION__', finalDescription)
    .replace('__OG_IMAGE__', finalImage)
    .replace('__OG_URL__', finalUrl);

  // Ensure the output directory exists
  fs.mkdirSync(outputDir, { recursive: true });

  // Write the updated HTML to the directory
  fs.writeFileSync(path.join(outputDir, 'index.html'), htmlContent);
};

// Generate static HTML for Articles
allArticles.forEach((article) => {
  const outputDir = path.resolve('build', `articles/${article.slug}`);
  generateStaticHtml('article', article, outputDir);
});

// Generate static HTML for Projects
allProjects.forEach((project) => {
  const outputDir = path.resolve('build', `projects/${project.slug}`);
  generateStaticHtml('project', project, outputDir);
});

// Generate static HTML for Demos
allDemos.forEach((demo) => {
  const outputDir = path.resolve('build', `demos/${demo.slug}`);
  generateStaticHtml('demo', demo, outputDir);
});

// Generate static HTML for additional pages from metaTagData
Object.entries(metaTagData).forEach(([pathKey, pageData]) => {
  const outputDir = path.resolve('build', pathKey.replace(/^\//, '')); // Remove leading slash for folder naming
  generateStaticHtml('page', pageData, outputDir);
});

console.log('Static HTML files generated successfully!');