import { Box, IconButton, List, ListItem, ListItemText, Avatar, Badge, Drawer, Typography } from '@mui/material';
import { useCart } from '../../hooks/useCart';
import { CartIcon, ClearCartIcon } from "../Icons";
import { useState } from 'react';

function CartItem({ Foto, Precio, Nombre, quantity, addToCart }) {
  return (
    <ListItem 
      sx={{
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1
      }}
    >
      <Avatar 
        src={`data:image/jpeg;base64,${Foto}`}
        alt={Nombre}
        variant="square"
        sx={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
      />
      <Box textAlign="center">
        <Typography variant="subtitle1">{Nombre}</Typography>
        <Typography>Q{Precio}</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="body2">Cant: {quantity}</Typography>
        <IconButton 
          onClick={addToCart}
          size="small"
          sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
        >
          +
        </IconButton>
      </Box>
    </ListItem>
  );
}

export function Cart() {
  const { cart, clearCart, addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen); // Función para alternar el estado

  return (
    <>
      <IconButton
        onClick={toggleCart} // Usamos toggleCart en lugar de solo abrir
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
        onClose={toggleCart} // También actualizamos aquí para consistencia
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)'
          }
        }}
      >
        <List sx={{ p: 2 }}>
          {cart.map(product => (
            <CartItem
              key={product.ProductoID}
              addToCart={() => addToCart(product)}
              {...product}
            />
          ))}
        </List>
        
        {cart.length > 0 && (
          <Box textAlign="center" p={2}>
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
          </Box>
        )}
      </Drawer>
    </>
  );
}