/* eslint-disable linebreak-style */
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { Persons, Dashboard } from '../pages';
import { Cities } from '../pages/Cities';
import { FormContainer as PersonForm } from '../pages/Persons/FormContainer';
import { FormContainer as CityForm } from '../pages/Cities/FormContainer';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext(); 

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/',
        label: 'Página inicial'
      },
      {
        icon: 'people',
        path: '/persons',
        label: 'Pessoas'
      },
      {
        icon: 'location_city',
        path: '/cities',
        label: 'Cidades'
      }
    ]);
  },[]);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="persons" element={<Persons />} />
      <Route path="persons/form" element={<PersonForm />} />
      <Route path="persons/form/:id" element={<PersonForm />} />

      <Route path="cities" element={<Cities />} />
      <Route path="cities/form" element={<CityForm />} />
      <Route path="cities/form/:id" element={<CityForm />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};