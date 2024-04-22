/* eslint-disable linebreak-style */
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { ListingTools } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { useEffect, useState } from 'react';
import { PersonService } from '../../shared/services/api/person/PersonService';
import { CityService } from '../../shared/services/api/city/CityService';

export const Dashboard = () => {
  const [isLoadingPersons, setIsLoadingPersons] = useState(true);
  const [isLoadingCities, setIsLoadingCities] = useState(true);

  const [totalCountPersons, setTotalCountPersons] = useState(0);
  const [totalCountCities, setTotalCountCities] = useState(0);

  useEffect(() => {
    setIsLoadingPersons(true);
    setIsLoadingCities(true);

      PersonService
          .getAll(1)
          .then((result) => {
              setIsLoadingPersons(false);

              if (result instanceof Error) {
                  alert(result.message);
                  return;
              } else {
                setTotalCountPersons(result.totalCount);
              }
          })
      CityService
          .getAll(1)
          .then((result) => {
              setIsLoadingCities(false);

              if (result instanceof Error) {
                  alert(result.message);
                  return;
              } else {
                setTotalCountCities(result.totalCount);
              }
          })
}, []);

  return (
    <LayoutBase 
      titulo="Página inicial" 
      barraDeFerramentas={<ListingTools showButton={false}/>}
    >
      <Box width="100%" display="flex">
        <Grid container margin={1}>

          <Grid item container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align='center'>
                    Total de pessoas
                  </Typography>
                  <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                    {isLoadingPersons && (
                      <Typography variant='h5'>...Carregando</Typography>
                    )}
                    {!isLoadingPersons && (
                      <Typography variant='h1'>{totalCountPersons}</Typography>
                    )}                    
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align='center'>
                    Total de cidades
                  </Typography>
                  <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                    {isLoadingCities && (
                      <Typography variant='h5'>...Carregando</Typography>
                    )}
                    {!isLoadingCities && (
                      <Typography variant='h1'>{totalCountCities}</Typography>
                    )}                    
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

        </Grid>
      </Box>
    </LayoutBase>
  );
};