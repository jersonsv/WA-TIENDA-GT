import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button
} from '@mui/material';

export function ClienteDashboard() {
  const [productos, setProductos] = useState([]);

  // Aquí podrías agregar la lógica para cargar los productos
  useEffect(() => {
    // fetchProductos();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Catálogo de Productos
      </Typography>
      <Grid container spacing={4}>
        {/* Aquí irían los productos en un grid */}
        {/* Ejemplo de un producto */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="/placeholder.jpg"
              alt="Producto"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Producto Ejemplo
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Descripción del producto
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                $99.99
              </Typography>
              <Button variant="contained" sx={{ mt: 2 }}>
                Agregar al Carrito
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}