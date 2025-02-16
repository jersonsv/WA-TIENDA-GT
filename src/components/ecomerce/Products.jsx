import React from "react";
import { AddToCartIcon, RemoveFromCartIcon } from "../utils/Icons";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { useCart } from "../../hooks/useCart";

const Products = ({ products }) => {
  const { addToCart, cart, removeFromCart } = useCart();

  const checkProductInCart = (product) => {
    return cart.some((item) => item.ProductoID === product.ProductoID);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Catálogo de Productos
      </Typography>
      <Grid container spacing={4}>
        {products.slice(0, 10).map((product) => {
          const isProductInCart = checkProductInCart(product);

          return (
            <Grid item xs={12} sm={6} md={3} key={product.ProductoID}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    `data:image/jpeg;base64,${product.Foto}` ||
                    "/placeholder.jpg"
                  }
                  alt={product.Nombre}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.Nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${product.Nombre} ${product.Marca} ${product.Categoria}`}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Q{product.Precio}
                  </Typography>
                  <Button
                    style={{ backgroundColor: isProductInCart ? "red" : "" }}
                    onClick={() => {
                      isProductInCart
                        ? removeFromCart(product)
                        : addToCart(product);
                    }}
                    variant="contained"
                    sx={{ mt: 2 }}
                    fullWidth
                  >
                    {isProductInCart ? (
                      <RemoveFromCartIcon />
                    ) : (
                      <AddToCartIcon />
                    )}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Products;
