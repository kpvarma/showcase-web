import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';

// Page Imports
import Home from './pages/home/index';

import ProjectIndex from './pages/projects/index';
import ProjectShow from './pages/projects/show';

import DemoIndex from './pages/demos/index';

import ArticleIndex from './pages/articles/index';
import ArticleShow from './pages/articles/show';

import AboutMe from './pages/about_me/index';
import HireMe from './pages/HireMe';
import TestPage from './pages/TestPage';

import Transliterate from './pages/demos/transliterate/index.js';
import TransliterateDocument from './pages/demos/transliterate/transliterateDocument.js';
import TransliterateSample from './pages/demos/transliterate/transliterateSample.js';

import PdfToImageConverter from './pages/demos/convert_pdf_to_images/index.js';
import StitchPDFs from './pages/demos/stitch_pdfs/index.js';
import ConvertPdfToImagePdf from  './pages/demos/convert_pdf_to_image_pdf/index.js';

import OptimizeImages from './pages/demos/optimize_images/index.js';
import OcrImages from './pages/demos/ocr_images/index.js';
import OcrImagePDF from './pages/demos/ocr_image_pdf/index.js';

import ImageCaptioning from './pages/demos/image_captioning_accessibility/index.js';


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/', element: <Home /> },
        
        { path: '/projects', element: <ProjectIndex /> },
        { path: '/projects/:slug', element: <ProjectShow /> },
        
        { path: '/demos', element: <DemoIndex /> },
        
        { path: '/articles', element: <ArticleIndex /> },
        { path: '/articles/:slug', element: <ArticleShow /> },
        
        { path: '/aboutme', element: <AboutMe /> },
        { path: '/hireme', element: <HireMe /> },
        { path: '/testpage', element: <TestPage /> },
        
        { path: '/demos/transliterate', element: <Transliterate /> },
        { path: '/demos/transliterate_document', element: <TransliterateDocument /> },
        { path: '/demos/transliterate_sample', element: <TransliterateSample /> },
        
        { path: '/demos/convert_pdf_to_images', element: <PdfToImageConverter /> },
        { path: '/demos/stitch_pdfs', element: <StitchPDFs /> },
        { path: '/demos/convert_pdf_to_image_pdf', element: <ConvertPdfToImagePdf /> },
        { path: '/demos/optimize_images', element: <OptimizeImages /> },
        { path: '/demos/ocr_images', element: <OcrImages /> },
        { path: '/demos/ocr_image_pdf', element: <OcrImagePDF /> },

        { path: '/demos/image_captioning_accessibility', element: <ImageCaptioning /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true, // Opt into React Router v7 behavior
    },
  }
);

export default router;