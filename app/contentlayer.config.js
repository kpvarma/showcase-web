import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import { writeFileSync } from 'fs'
import readingTime from 'reading-time'
// import { slug } from 'github-slugger'
// import path from 'path'
// import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
// Remark packages
// import remarkGfm from 'remark-gfm'
// import remarkMath from 'remark-math'
// import { remarkAlert } from 'remark-github-blockquote-alert'
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings,
} from 'pliny/mdx-plugins/index.js'
// Rehype packages
// import rehypeSlug from 'rehype-slug'
// import rehypeAutolinkHeadings from 'rehype-autolink-headings'
// import rehypeKatex from 'rehype-katex'
// import rehypeKatexNoTranslate from 'rehype-katex-notranslate'
// import rehypeCitation from 'rehype-citation'
// import rehypePrismPlus from 'rehype-prism-plus'
// import rehypePresetMinify from 'rehype-preset-minify'
// import siteMetadata from './data/siteMetadata'
// import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'

// Remove TypeScript-specific annotations
const computedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
  path: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: 'json', resolve: (doc) => extractTocHeadings(doc.body.raw) },
};

const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/*.mdx`,
  contentDirPath: 'data',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    date: { type: 'date', required: true },
    last_modified: { type: 'date' },
    skills: { type: 'list', of: { type: 'string' }, required: true },

    cover_image: { type: 'string', required: true },
    thumb_image: { type: 'string', required: true },

    featured: { type: 'boolean' },
    layout: { type: 'string' },
    draft: { type: 'boolean' },
    
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'Project'
      }),
    },
  },
}));

const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: 'articles/**/*.mdx',
  contentDirPath: 'data',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    summary: { type: 'string' },
    date: { type: 'date', required: true },
    last_modified: { type: 'date' },
    tags: { type: 'list', of: { type: 'string' }, default: [] },

    thumb_image: { type: 'string', required: true },
    cover_image: { type: 'string', required: true },

    featured: { type: 'boolean' },
    layout: { type: 'string' },
    draft: { type: 'boolean' },
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'Article'
      }),
    },
  },
}));

module.exports = makeSource({
  contentDirPath: 'data',
  documentTypes: [Project, Article],
  disableTypeScript: true, // Ensure this is set if you're not using TypeScript
});