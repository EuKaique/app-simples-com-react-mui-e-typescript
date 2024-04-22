import { BrowserRouter } from 'react-router-dom';
import './shared/forms/translationYup';
import { AppRoutes } from './routes';
import { AuthProvider, DrawerProvider, ThemeProvider } from './shared/contexts';
import { Login, MenuSide } from './shared/components';

export const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>

        <Login>
          <DrawerProvider>

            <BrowserRouter>

              <MenuSide>
                <AppRoutes />
              </MenuSide>

            </BrowserRouter>

          </DrawerProvider>
        </Login>
        
      </ThemeProvider>

    </AuthProvider>
  );
};
