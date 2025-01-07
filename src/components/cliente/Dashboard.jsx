import { useEffect, useState } from 'react';
import Ecomerce from '../ecomerce/Ecomerce';
import {
  Container,
} from '@mui/material';


export function ClienteDashboard() {
  const [productos, setProductos] = useState([]);

  // Aquí podrías agregar la lógica para cargar los productos
  useEffect(() => {
    // fetchProductos();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Ecomerce />
    </Container>
  );
}