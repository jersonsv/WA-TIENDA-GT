import { Box, IconButton, List, ListItem, Typography, Badge, Drawer, Button } from '@mui/material';
import { useCart } from '../../../hooks/useCart';
import { CartIcon, ClearCartIcon } from "../../utils/Icons";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useOrden } from '../../../hooks/useOrden'
import { useClient } from "../../../hooks/useClient"
import { useAuth } from '../../../hooks/useAuth';

function CartItem({ ProductoID, Precio, Nombre, quantity, addToCart, removeFromCart }) { 
  const subtotal = Precio * quantity;
  
  return (
    <ListItem
      sx={{
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        display: 'grid',
        gridTemplateColumns: '2fr 1.5fr 1fr',
        gap: 2,
        py: 2
      }}
    >
      <Typography variant="body1">{Nombre}</Typography>
      <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
        <IconButton 
          size="small"
          onClick={() => removeFromCart()}
          sx={{
            minWidth: '24px',
            height: '24px',
            bgcolor: 'error.main',
            color: 'white',
            '&:hover': { bgcolor: 'error.dark' }
          }}
        >
          -
        </IconButton>
        <Typography variant="body2">
          {quantity}
        </Typography>
        <IconButton
          size="small"
          onClick={() => addToCart()}
          sx={{
            minWidth: '24px',
            height: '24px',
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': { bgcolor: 'primary.dark' }
          }}
        >
          +
        </IconButton>
      </Box>
      <Typography variant="body2" textAlign="right">
        Q{subtotal.toFixed(2)}
      </Typography>
    </ListItem>
  );
}


export function Cart() {
  const { cart, clearCart, addToCart, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addOrden } = useOrden();
  const { user } = useAuth()
  const { getClient, selectClient } = useClient();
  
  const [orderData, setOrderData] = useState({
    nombreCompleto: selectClient?.RazonSocial || '',
    direccion: selectClient?.DireccionEntrega || '',
    telefono: selectClient?.Telefono || '',
    correoElectronico: selectClient?.Email || '',
    fechaEntrega: "2024-12-25"
  });

   // Movemos la lógica de carga de datos aquí
   useEffect(() => {
    const loadClientData = async () => {
      if (user?.clienteId) {
        try {
          await getClient(user.clienteId);
        } catch (error) {
          console.error('Error loading client data:', error);
        }
      }
    };

    loadClientData();
  }, []);

  // Actualizar orderData cuando selectClient cambie
  useEffect(() => {
    if (selectClient) {
      setOrderData(prev => ({
        ...prev,
        nombreCompleto: selectClient.RazonSocial || '',
        direccion: selectClient.DireccionEntrega || '',
        telefono: selectClient.Telefono || '',
        correoElectronico: selectClient.Email || ''
      }));
    }
  }, [selectClient]);

  const toggleCart = () => setIsOpen(!isOpen);

  // Calcular el total del carrito
  const total = cart.reduce((sum, item) => sum + (item.Precio * item.quantity), 0);

  // Función para guardar el pedido
  const handleConfirmOrder = async () => {
    if (cart.length === 0) return;

    setIsLoading(true);
    try {
      const orderPayload = {
        usuarioID: user?.usuarioId, // Esto debería venir de tu contexto de autenticación
        ...orderData,
        totalOrden: total,
        detalles: cart.map(item => ({
          productoID: item.ProductoID,
          cantidad: item.quantity,
          precio: item.Precio
        }))
      };;
      console.log('Enviando datos orden: ',orderPayload)
      await addOrden(orderPayload);
      clearCart();
      setIsOpen(false);
      // Aquí podrías añadir una notificación de éxito
    } catch (error) {
      console.error('Error al guardar el pedido:', error);
      // Aquí podrías añadir una notificación de error
    } finally {
      setIsLoading(false);
    }
  };

  
  return (
    <>
      <IconButton
        onClick={toggleCart}
        sx={{
          position: 'fixed',
          right: '8px',
          top: '8px',
          bgcolor: 'primary.main',
          color: 'white',
          zIndex: 9999,
          '&:hover': {
            bgcolor: 'primary.dark',
            transform: 'scale(1.1)'
          },
          transition: 'all 0.3s ease'
        }}
      >
        <Badge badgeContent={cart.length} color="error">
          <CartIcon />
        </Badge>
      </IconButton>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleCart}
        sx={{
          '& .MuiDrawer-paper': {
            width: 350,
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)'
          }
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ p: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
            Carrito de Compras
          </Typography>

          {/* Header de la lista */}
          {cart.length > 0 && (
            <ListItem
              sx={{
                borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                display: 'grid',
                gridTemplateColumns: '2fr 1.5fr 1fr',
                gap: 2,
                py: 1,
                bgcolor: 'primary.main',
                color: 'white'
              }}
            >
              <Typography variant="subtitle2">Producto</Typography>
              <Typography variant="subtitle2" textAlign="center">Cantidad</Typography>
              <Typography variant="subtitle2" textAlign="right">Subtotal</Typography>
            </ListItem>
          )}

          {/* Lista de productos */}
          <List sx={{ flexGrow: 1, overflow: 'auto' }}>
            {cart.map(product => (
              <CartItem
                key={product.ProductoID}
                {...product}
                addToCart={() => addToCart(product)}
                removeFromCart={() => removeFromCart(product)}
              />
            ))}
          </List>

          {/* Footer con total y botones */}
          {cart.length > 0 && (
            <Box sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
              <Typography variant="h6" textAlign="right" sx={{ mb: 2 }}>
                Total: Q{total.toFixed(2)}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
                <IconButton
                  onClick={clearCart}
                  sx={{
                    bgcolor: 'error.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'error.dark' }
                  }}
                >
                  <ClearCartIcon />
                </IconButton>

                <Button
                  variant="contained"
                  onClick={handleConfirmOrder}
                  disabled={isLoading}
                  sx={{ flexGrow: 1 }}
                >
                  {isLoading ? 'Procesando...' : 'Confirmar Pedido'}
                </Button>
              </Box>
            </Box>
          )}

          {cart.length === 0 && (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body1">El carrito está vacío</Typography>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
}