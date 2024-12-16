import { defineDocumentType, makeSource } from '@contentlayer/source-files';

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

    cover_image: { type: 'string', required: true },
    thumb_image: { type: 'string', required: true },

    featured: { type: 'boolean' },
    layout: { type: 'string' },
    draft: { type: 'boolean' },
    demo_url: { type: 'string' },
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
    cover_image: { type: 'string', required: true },

    featured: { type: 'boolean' },
    layout: { type: 'string' },
    draft: { type: 'boolean' },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Project, Article],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});