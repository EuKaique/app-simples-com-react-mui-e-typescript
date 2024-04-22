/* eslint-disable linebreak-style */
import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';

import { Environment } from '../../environment';

interface IListingToolsProps {
    textSearch?: string;
    showInput?: boolean;
    onTextSearchChange?: (text: string) => void;
    textButton?: string;
    onClickButton?: () => void;
    showButton?: boolean;
}

export const ListingTools = (props: IListingToolsProps) => {
  const {
    textSearch = '', 
    onTextSearchChange,
    showInput = false,
    textButton = 'Novo',
    onClickButton,
    showButton = true
  } = props;

  const theme = useTheme();
  return (
    <Box 
      height={theme.spacing(5)}
      marginX={1} 
      padding={1} 
      display='flex' 
      gap={1} 
      alignItems='center' 
      component={Paper}
    >
      {showInput && (
        <TextField
          size='small'
          placeholder={Environment.INPUT_OF_SEARCH}
          value={textSearch}
          onChange={e => onTextSearchChange?.(e.target.value)}
        />
      )}
      <Box flex={1} display='flex' justifyContent='end'>
        {showButton && (
          <Button
            variant='contained'
            color='primary'
            disableElevation
            onClick={onClickButton}
            endIcon={<Icon>add</Icon>}
          >{textButton}</Button>
        )}
      </Box>
    </Box>
  );
};