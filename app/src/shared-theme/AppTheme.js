import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { inputsCustomizations } from './customizations/inputs';
import { dataDisplayCustomizations } from './customizations/dataDisplay';
import { feedbackCustomizations } from './customizations/feedback';
import { navigationCustomizations } from './customizations/navigation';
import { surfacesCustomizations } from './customizations/surfaces';
import { colorSchemes, typography, shadows, shape } from './themePrimitives';

function AppTheme({ children, disableCustomTheme, themeComponents }) {
  const theme = React.useMemo(() => {
    return disableCustomTheme
      ? {}
      : createTheme({
          // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
          cssVariables: {
            colorSchemeSelector: 'data-mui-color-scheme',
            cssVarPrefix: 'template',
          },
          colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
          typography,
          shadows,
          shape,
          components: {
            ...inputsCustomizations,
            ...dataDisplayCustomizations,
            ...feedbackCustomizations,
            ...navigationCustomizations,
            ...surfacesCustomizations,
            // Add custom global styles
            MuiCssBaseline: {
              styleOverrides: {
                // Common styles for both light and dark modes
                body: {
                  backgroundRepeat: 'no-repeat',
                  margin: 0,
                  padding: 0,
                  boxSizing: 'border-box',
                  fontFamily: 'Roboto, Arial, sans-serif',
                },
                // Light mode specific styles
                '@media (prefers-color-scheme: light)': {
                  body: {
                    backgroundImage:
                      'radial-gradient(80% 50% at 50% -20%, rgb(204, 230, 255), transparent)',
                    backgroundSize: 'cover',
                    color: 'rgb(30, 30, 30)', // Dark text for light mode
                  },
                },
                // Dark mode specific styles
                '@media (prefers-color-scheme: dark)': {
                  body: {
                    backgroundImage:
                      'radial-gradient(80% 50% at 50% -20%, rgb(0, 41, 82), transparent)',
                    backgroundSize: 'cover',
                    backgroundColor: 'rgb(0, 30, 60)', // Fallback background
                    color: 'rgb(220, 220, 220)', // Light text for dark mode
                  },
                },
              },
            },
            ...themeComponents,
          },
        });
  }, [disableCustomTheme, themeComponents]);
  if (disableCustomTheme) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}

AppTheme.propTypes = {
  children: PropTypes.node,
  /**
   * This is for the docs site. You can ignore it or remove it.
   */
  disableCustomTheme: PropTypes.bool,
  themeComponents: PropTypes.object,
};

export default AppTheme;