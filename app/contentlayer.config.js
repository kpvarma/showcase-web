import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import { visit } from 'unist-util-visit';

const computedFields = {
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
  score: {
    type: 'number',
    resolve: (doc) => {
      const featuredScore = doc.featured ? 1 : 0;

      const lastModified = new Date(doc.last_modified);
      const now = new Date();
      const daysSinceLastModified = doc.last_modified
        ? Math.floor((now - lastModified) / (1000 * 60 * 60 * 24)) // Convert milliseconds to days
        : 0;

      return featuredScore + (1 / (daysSinceLastModified + 1));
    },
  },
};

const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/*.mdx',
  contentDirPath: 'data',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    date: { type: 'date', required: true },
    last_modified: { type: 'date' },
    skills: { type: 'list', of: { type: 'string' }, required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    
    thumb_image: { type: 'string', required: true },
    cover_image: { type: 'string' },

    featured: { type: 'boolean' },
    layout: { type: 'string' },
    draft: { type: 'boolean' },
    demo_url: { type: 'string' },
  },
  computedFields,
}));

const Demo = defineDocumentType(() => ({
  name: 'Demo',
  filePathPattern: 'demos/*.mdx',
  contentDirPath: 'data',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    date: { type: 'date', required: true },
    last_modified: { type: 'date' },
    skills: { type: 'list', of: { type: 'string' }, required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    
    thumb_image: { type: 'string', required: true },
    cover_image: { type: 'string' },

    featured: { type: 'boolean' },
    layout: { type: 'string' },
    draft: { type: 'boolean' },
    url: { type: 'string' },
  },
  computedFields,
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
    cover_image: { type: 'string' },

    featured: { type: 'boolean' },
    layout: { type: 'string' },
    draft: { type: 'boolean' },
  },
  computedFields,
}));

export const rehypeDefaultLanguage = (defaultLanguage = 'text') => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'code' && !node.properties.className) {
        node.properties.className = [`language-${defaultLanguage}`];
      }
    });
  };
};

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Project, Demo, Article],
  mdx: {
    remarkPlugins: [remarkGfm], // Enables tables and GFM
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      [rehypeDefaultLanguage, 'text'], // Fallback to plain text for code blocks without a language
      rehypeHighlight,
    ],
  },
});