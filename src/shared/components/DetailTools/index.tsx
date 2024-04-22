/* eslint-disable linebreak-style */
import { Box, Button, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';

interface IDetailToolsProps {
    textButtonNew?: string;

    showButtonNew?: boolean;
    showButtonBack?: boolean;
    showButtonSave?: boolean;
    showButtonSaveAndClosed?: boolean;
    showButtonDelete?: boolean;

    showButtonNewLoading?: boolean;
    showButtonBackLoading?: boolean;
    showButtonSaveLoading?: boolean;
    showButtonSaveAndClosedLoading?: boolean;
    showButtonDeleteLoading?: boolean;

    onClickButtonNew?: () => void;
    onClickButtonBack?: () => void;
    onClickButtonSave?: () => void;
    onClickButtonSaveAndBack?: () => void;
    onClickButtonDelete?: () => void;
}    
export const DetailTools = (
  {textButtonNew = 'Novo', 
    showButtonNew = true,
    showButtonBack = true,
    showButtonSave = true, 
    showButtonSaveAndClosed = false, 
    showButtonDelete = true, 
    showButtonBackLoading = false,
    showButtonNewLoading = false,
    showButtonSaveLoading = false,
    showButtonSaveAndClosedLoading = false,
    showButtonDeleteLoading = false,
    onClickButtonNew, 
    onClickButtonBack, 
    onClickButtonSave, 
    onClickButtonSaveAndBack, 
    onClickButtonDelete}: IDetailToolsProps
) => {
  const theme = useTheme();

  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

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
      {(showButtonSave && !showButtonSaveLoading) && (
        <Button
          variant='contained'
          color='primary'
          disableElevation
          onClick={onClickButtonSave}
          startIcon={<Icon>save</Icon>}
        >
          <Typography 
            variant='button' 
            whiteSpace="nowrap" 
            textOverflow="ellipsis" 
            overflow="hidden"
          >
            Salvar
          </Typography>
        </Button>
      )}
      {showButtonSaveLoading && (
        <Skeleton width={110} height={60}/>
      )}
      {(showButtonSaveAndClosed && !showButtonSaveAndClosedLoading && !smDown && !mdDown) && (
        <Button
          variant='contained'
          color='primary'
          disableElevation
          onClick={onClickButtonSaveAndBack}
          startIcon={<Icon>save</Icon>}
        >
          <Typography 
            variant='button' 
            whiteSpace="nowrap" 
            textOverflow="ellipsis" 
            overflow="hidden"
          >
            Salvar e fechar
          </Typography>
        </Button>
      )}
      {showButtonSaveAndClosedLoading && !smDown && !mdDown && (
        <Skeleton width={180} height={60}/>
      )}
      {(showButtonDelete && !showButtonDeleteLoading) && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          onClick={onClickButtonDelete}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography 
            variant='button' 
            whiteSpace="nowrap" 
            textOverflow="ellipsis" 
            overflow="hidden"
          >
            Apagar
          </Typography>
        </Button>
      )}
      {showButtonDeleteLoading && (
        <Skeleton width={110} height={60}/>
      )}
      {(showButtonNew && !showButtonNewLoading && !smDown && !mdDown) && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          onClick={onClickButtonNew}
          startIcon={<Icon>add</Icon>}
        >
          <Typography 
            variant='button' 
            whiteSpace="nowrap" 
            textOverflow="ellipsis" 
            overflow="hidden"
          >
            {textButtonNew}
          </Typography>
        </Button>
      )}
      {showButtonNewLoading && !smDown && (
        <Skeleton width={110} height={60}/>
      )}

      {(
        showButtonBack && (
          showButtonNew || showButtonSave || showButtonSaveAndClosed || showButtonDelete 
        ) && (
          <Divider variant='middle' orientation='vertical'/>
        )
      )}
      
      {(showButtonBack && !showButtonBackLoading) && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          onClick={onClickButtonBack}
          startIcon={<Icon>arrow_back</Icon>}
        >
          <Typography 
            variant='button' 
            whiteSpace="nowrap" 
            textOverflow="ellipsis" 
            overflow="hidden"
          >
            Voltar
          </Typography>
        </Button>
      )}
      {showButtonBackLoading && (
        <Skeleton width={110} height={60}/>
      )}
    </Box>
  );
};