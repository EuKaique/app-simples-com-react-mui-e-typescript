/* eslint-disable linebreak-style */
import { 
  Avatar, 
  Box, 
  Divider, 
  Drawer, 
  Icon, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  useMediaQuery,
  useTheme } from '@mui/material';
import { useAuthContext, useDrawerContext, useThemeContext } from '../../contexts';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MenuSide = ({children}: any) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const {isDrawerOpen, toggleDrawerOpen, drawerOptions} = useDrawerContext();
  const {toggleTheme} = useThemeContext();
  const { logout } = useAuthContext();

  interface IListItemLinkProps {
    to: string;
    icon: string;
    label: string;
    onClick: (() => void) | undefined;
  }

  const ListItemLink = ({to, icon, label, onClick}: IListItemLinkProps) => {
    const navigate = useNavigate();

    const resolvePath = useResolvedPath(to);
    const match = useMatch({path: resolvePath.pathname, end: false});


    const handleClick = () => {
      navigate(to);
      onClick?.();
    };

    return (
      <ListItemButton selected={!!match} onClick={handleClick}>
        <ListItemIcon>
          <Icon>{icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    );
  };

  return (
    <>
      <Drawer variant={smDown ? 'temporary' : 'permanent'} open={isDrawerOpen} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
          <Box 
            width="100%" 
            height={theme.spacing(20)} 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
          >
            <Avatar sx={{ height: theme.spacing(12), width: theme.spacing(12) }} src='meuamor.jpg'/>
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map(drawerOption => (
                <ListItemLink
                  to={drawerOption.path}
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>
          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary="Alternar tema" />
              </ListItemButton>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};