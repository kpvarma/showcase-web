import React, { useState } from 'react';

// Import Material-UI for the copy icon
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const CodeBlock = ({ children, className = '', metastring }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const codeToCopy = Array.isArray(children)
      ? children.join('').trim()
      : (children || '').toString().trim();

    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  // Extract language and highlighted lines
  const language = className.replace('language-', '');
  const highlightLines = metastring
    ? metastring
        .split('highlightLines=')[1]
        ?.replace(/"/g, '')
        .split(',')
        .map((line) => parseInt(line, 10))
    : [];

  return (
    <div style={{ position: 'relative', marginBottom: '1rem' }}>
      {/* Preformatted code block */}
      <pre
        className={className}
        data-highlight-lines={highlightLines.join(',')} // Custom attribute for highlighting
        style={{ padding: '1rem', overflowX: 'auto', position: 'relative' }}
      >
        <code>{children}</code>
      </pre>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: '#007acc',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '5px 10px',
          cursor: 'pointer',
          fontSize: '0.875rem',
        }}
      >
        <ContentCopyIcon style={{ fontSize: '1rem' }} />
        {copied ? 'Copied!' : 'Copy'}
      </button>

      {/* Language Tag
      {language && (
        <span
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            fontSize: '0.75rem',
            color: '#888',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            padding: '2px 5px',
          }}
        >
          {language}
        </span>
      )} */}
    </div>
  );
};

export default CodeBlock;