/* eslint-disable linebreak-style */
import { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerOption {
    icon: string,
    path: string,
    label: string
}
interface IDrawerContextData {
    isDrawerOpen: boolean,
    drawerOptions: IDrawerOption[],
    toggleDrawerOpen: () => void,
    setDrawerOptions: (newOptions: IDrawerOption[]) => void,
}


const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DrawerProvider = ({children}: any) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerOptions, setIsDrawerOptions] = useState<IDrawerOption[]>([]);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(!isDrawerOpen);
  }, [isDrawerOpen]);

  const handleSetDrawerOptions = useCallback((newOptions: IDrawerOption[]) => {
    setIsDrawerOptions(newOptions);
  }, []);

  return(
    <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions}}>
      {children}
    </DrawerContext.Provider>
  );
};
