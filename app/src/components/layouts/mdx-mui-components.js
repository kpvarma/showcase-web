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
        fontSize: '1rem',
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
    sx={(theme) => ({
      marginBottom: 2,
      marginTop: 2,
      border: `1px solid ${theme.palette.divider}`, // Use theme's divider color
      '& th, & td': {
        padding: 1.5,
        textAlign: 'left',
        borderBottom: `1px solid ${theme.palette.divider}`, // Add row borders
      },
      backgroundColor: theme.palette.background.paper, // Adapt to light/dark mode
      color: theme.palette.text.primary, // Adapt text color
      borderRadius: '8px', // Add rounded corners for better aesthetics
      overflow: 'hidden', // Ensure content stays inside
    })}
  />
)),

tr: memo((props) => <TableRow {...props} />),

td: memo(({ align, ...props }) => (
  <TableCell
    align={align || undefined}
    sx={(theme) => ({
      color: theme.palette.text.primary,
    })}
    {...props}
  />
)),

tbody: memo((props) => <TableBody {...props} />),

th: memo(({ align, ...props }) => (
  <TableCell
    align={align || undefined}
    sx={(theme) => ({
      fontWeight: 'bold',
      backgroundColor: theme.palette.action.hover, // Subtle background for header cells
      color: theme.palette.text.primary,
      borderBottom: `1px solid ${theme.palette.divider}`,
    })}
    {...props}
  />
)),

thead: memo((props) => <TableHead {...props} />),

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

  // CodeBlock with improved styling
  code: CodeBlock,
  
  // Label highlight component
  LabelHighlight: memo(({ children, color = '#016f9c', backgroundColor = 'rgb(255 255 255)', fontWeight = 'bold', ...props }) => (
    <span
      {...props}
      style={{
        color: color,
        backgroundColor: backgroundColor,
        fontWeight: fontWeight,
        borderRadius: '4px',
        padding: '2px 4px',
        fontFamily: 'Roboto, Arial, sans-serif',
      }}
    >
      {children}
    </span>
  )),
};

export default MuiComponents;