import React, { memo, useCallback, useMemo, useState, useEffect } from "react";
import Prism from "prismjs";
import components from "prismjs/components";
import "prismjs/themes/prism.css"; // Use a theme you like
import { Box, Paper, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const nativeLanguages = components.languages;
const nativePairs = Object.assign(
  ...Object.entries(nativeLanguages).map(([key, value]) => ({
    [key]: { key, lang: value },
  }))
);

const pairs = Object.assign(
  ...Object.entries(nativePairs)
    .filter(([key, value]) => value.lang.alias)
    .map(([key, value]) => {
      const alias = Array.isArray(value.lang.alias)
        ? value.lang.alias
        : [value.lang.alias];
      return Object.assign(...alias.map((a) => ({ [a]: value })));
    }),
  nativePairs
);

const importLang = async (language) => {
  const { key, lang } = pairs[language];
  if (!key) {
    return;
  }
  if (lang.require) {
    const req = Array.isArray(lang.require) ? lang.require : [lang.require];
    await Promise.all(req.map((language) => importLang(language)));
  }
  await import(`prismjs/components/prism-${key}`);
};

const CodeBlock = ({ children, className }) => {
  const language = useMemo(
    () => (className ? className.replace(/language-/, "") : ""),
    [className]
  );
  const { key } = useMemo(() => pairs[language] || {}, [language]);
  const canBeHighlighted = useMemo(() => Boolean(key), [key]);
  const [isReady, setIsReady] = useState(!canBeHighlighted);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    let isCanceled = false;
    setIsReady(!canBeHighlighted);
    if (canBeHighlighted) {
      (async () => {
        await importLang(language);
        if (isCanceled) return;
        setIsReady(true);
      })();
    }
    return () => {
      isCanceled = true;
    };
  }, [canBeHighlighted, language]);

  const html = useMemo(() => {
    if (!isReady || !canBeHighlighted) {
      return Prism.util.encode(children);
    }
    return Prism.highlight(children, Prism.languages[language], language);
  }, [canBeHighlighted, children, isReady, language]);

  const createMarkup = useCallback(() => ({ __html: html }), [html]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children.trim()).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
      },
      () => {
        setCopySuccess(false);
      }
    );
  };

  return (
    <Box sx={{ my: 2 }}>
      <Paper
        elevation={3}
        sx={{
          position: "relative",
          padding: 2,
          backgroundColor: "text.secondary",
          // border: "1px solid #f1f1f1",
          borderRadius: "4px",
          overflowX: "auto",
          fontFamily: '"Fira Code", "Roboto Mono", monospace',
        }}
      >
        {/* Copy Button */}
        <Tooltip title={copySuccess ? "Copied!" : "Copy to clipboard"} arrow>
          <IconButton
            size="small"
            onClick={copyToClipboard}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: copySuccess ? "#4caf50" : "#fff",
              "&:hover": {
                backgroundColor: copySuccess ? "#66bb6a" : "#f0f0f0",
              },
            }}
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* Code Block */}
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={createMarkup()}
        />
      </Paper>
    </Box>
  );
};

export default memo(CodeBlock);