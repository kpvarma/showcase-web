import React, { memo } from 'react';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  Checkbox,
} from '@mui/material';
import CodeBlock from './mdx-mui-codeblock';

const MuiComponents = {
  // Paragraphs with better styling
  p: memo((props) => (
    <Typography
      {...props}
      variant="body1"
      component="p"
      sx={{
        // fontSize: '1rem',
        lineHeight: 1.5,
        marginBottom: 2,
        marginTop: 2,
        color: 'text.primary',
        fontFamily: 'Roboto, Arial, sans-serif',
      }}
    />
  )),

  // Headers with better spacing and font weight
  h1: memo((props) => (
    <Typography
      {...props}
      component="h1"
      variant="h4"
      gutterBottom
      sx={{
        color: 'text.primary',
        fontWeight: 'bold',
        marginBottom: 2,
        marginTop: 6,
      }}
    />
  )),
  h2: memo((props) => (
    <Typography
      {...props}
      component="h2"
      variant="h5"
      gutterBottom
      sx={{
        color: 'text.primary',
        fontWeight: 'bold',
        marginBottom: 2,
        marginTop: 5,
      }}
    />
  )),
  h3: memo((props) => (
    <Typography
      {...props}
      component="h3"
      variant="h6"
      gutterBottom
      sx={{
        color: 'text.primary',
        fontWeight: 'bold',
        marginBottom: 2,
        marginTop: 4,
      }}
    />
  )),
  h4: memo((props) => (
    <Typography {...props} component="h4" variant="h6" gutterBottom sx={{ color: 'text.secondary', marginBottom: 2, marginTop: 2 }} />
  )),
  h5: memo((props) => (
    <Typography {...props} component="h5" variant="subtitle1" gutterBottom sx={{ color: 'text.secondary', marginBottom: 1.5, marginTop: 1 }} />
  )),
  h6: memo((props) => (
    <Typography {...props} component="h6" variant="subtitle2" gutterBottom sx={{ color: 'text.secondary', marginBottom: 1, marginTop: 1 }} />
  )),

  // Blockquote styling
  blockquote: memo((props) => (
    <Paper
      {...props}
      elevation={1}
      sx={{
        color: 'text.secondary',
        padding: 0,
        paddingLeft: 1,
        marginBottom: 2,
        marginTop: 2,
        backgroundColor: '#f7f9fc',
        borderLeft: '5px solid #2196F3',
      }}
    >
      <Typography component="blockquote" variant="body1" sx={{ color: '#2C3E50' }} {...props} />
    </Paper>
  )),

  // Lists with spacing
  ul: memo((props) => (
    <Typography
      {...props}
      component="ul"
      variant="body1"
      sx={{
        color: 'text.primary',
        paddingLeft: 3,
        marginBottom: 2,
        marginTop: 2,
        listStyleType: 'disc',
      }}
    />
  )),
  ol: memo((props) => (
    <Typography
      {...props}
      variant="body1"
      component="ol"
      sx={{
        color: 'text.primary',
        paddingLeft: 3,
        marginBottom: 2,
        marginTop: 2,
        listStyleType: 'decimal',
      }}
    />
  )),
  li: memo((props) => (
    <Typography
      {...props}
      variant="body1"
      component="li"
      sx={{
        marginBottom: 1,
        fontSize: '1rem',
        color: 'text.primary',
        color: '#555',
      }}
    />
  )),

  // Tables with styling
  table: memo((props) => (
    <Table
      {...props}
      sx={{
        marginBottom: 2,
        marginTop: 2,
        border: '1px solid #ddd',
        '& th, & td': {
          padding: 1.5,
          textAlign: 'left',
        },
      }}
    />
  )),
  tr: memo((props) => <TableRow {...props} />),
  td: memo(({ align, ...props }) => <TableCell align={align || undefined} {...props} />),
  tbody: memo((props) => <TableBody {...props} />),
  th: memo(({ align, ...props }) => (
    <TableCell align={align || undefined} sx={{ fontWeight: 'bold', backgroundColor: '#f9f9f9' }} {...props} />
  )),
  thead: memo((props) => <TableHead {...props} />),

  // CodeBlock with improved styling
  code: memo((props) => (
    <CodeBlock
      {...props}
      variant="body1"
      sx={{
        // backgroundColor: '#282C34',
        color: '#FFFFFF',
        padding: 2,
        borderRadius: '4px',
        fontFamily: '"Fira Code", "Roboto Mono", monospace',
        fontSize: '0.875rem',
        overflowX: 'auto',
        marginBottom: 2,
      }}
    />
  )),

  // Divider for horizontal rule
  hr: memo(() => (
    <Divider
      sx={{
        marginY: 2,
      }}
    />
  )),

  // Input styling (checkbox and text input)
  input: memo((props) => {
    const { type } = props;
    if (type === 'checkbox') {
      return <Checkbox {...props} disabled={false} readOnly />;
    }
    return <input {...props} />;
  }),

  // Wrapper with consistent margin and padding
  wrapper: memo((props) => (
    <div
      {...props}
      className="markdown-body"
      style={{
        fontFamily: '"Roboto", Arial, sans-serif',
        lineHeight: 1.6,
        // margin: '0 auto',
        // padding: '0 16px',
        // maxWidth: '800px',
        color: '#333',
      }}
    />
  )),
};

export default MuiComponents;