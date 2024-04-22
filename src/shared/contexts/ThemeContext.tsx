/* eslint-disable linebreak-style */
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Box, ThemeProvider as Theme } from '@mui/material';
import { DarkTheme, LightTheme } from '../themes';

interface IThemeContextData {
    themeName: 'light' | 'dark',
    toggleTheme: () => void
}

const ThemeContext = createContext({} as IThemeContextData);

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ThemeProvider = ({children}: any) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
  }, []);

  const theme = useMemo(() => {
    return themeName === 'light' ? LightTheme : DarkTheme;
  }, [themeName]);

  return(
    <ThemeContext.Provider value={{ themeName, toggleTheme}}>
      <Theme theme={theme}>
        <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </Theme>
    </ThemeContext.Provider>
  );
};
