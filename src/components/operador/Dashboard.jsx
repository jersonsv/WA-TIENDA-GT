import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  Button,
  Box
} from '@mui/material';
import UserList from '../user/UserList';
import Orders from './Orders';
import Products from './Products';
import Category from './Category';
import Estado from './Estado';

/* Componentes para cada seccion */
const UserManagement = () => (
  <Paper sx={{ p: 2 }}>
    <Typography variant="h6" gutterBottom>
      Gestión de Usuarios
    </Typography>
    <UserList />
  </Paper>
);

const ProductManagement = () => (
  //Gestión de Productos
  <Products />
);

const CategoryManagement = () => (
  //Gestion de categorias
  <Category />
);

const StateManagement = () => (
  // Gestión de Estados
  <Estado />
);

const OrderHistory = () => (
    <Orders />
);

export function OperadorDashboard() {
  const [pedidos, setPedidos] = useState([]);
  const [currentSection, setCurrentSection] = useState('pedidos')

  // Renderizar la sección actual
  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'usuarios':
        return <UserManagement />;
      case 'productos':
        return <ProductManagement />;
      case 'categorias':
        return <CategoryManagement />;
      case 'estados':
        return <StateManagement />;
      default:
        return <OrderHistory pedidos={pedidos} />;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Panel de Control - Operador
          </Typography>
          <Button 
            color="inherit" 
            onClick={() => setCurrentSection('pedidos')}
          >
            Pedidos
          </Button>
          <Button 
            color="inherit" 
            onClick={() => setCurrentSection('usuarios')}
          >
            Usuarios
          </Button>
          <Button 
            color="inherit" 
            onClick={() => setCurrentSection('productos')}
          >
            Productos
          </Button>
          <Button 
            color="inherit" 
            onClick={() => setCurrentSection('categorias')}
          >
            Categorías
          </Button>
          <Button 
            color="inherit" 
            onClick={() => setCurrentSection('estados')}
          >
            Estados
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {renderCurrentSection()}
      </Container>
    </Box>
  );
}