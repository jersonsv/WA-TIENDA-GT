import React, { useEffect, useState } from "react";
import { useProduct } from "../../hooks/useProduct";
import { useFilters } from "../../hooks/useFilters";
import { Filters } from "../ecomerce/Filters";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  CardMedia,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Products = () => {
  const { products, getProducts } = useProduct();
  const { filterProducts } = useFilters();
  const filteredProducts = filterProducts(products);

  // Estado para el modal
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    Foto: "",
    Nombre: "",
    Marca: "",
    Categoria: "",
    Precio: "",
    Stock: "",
  });

  useEffect(() => {
    getProducts();
  }, []);

  // Manejadores para el modal
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditForm({
      Foto: product.Foto,
      Nombre: product.Nombre,
      Marca: product.Marca,
      Categoria: product.Categoria,
      Precio: product.Precio,
      Stock: product.Stock,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Aquí irá tu lógica para actualizar el producto
    console.log("Producto actualizado:", {
      ...selectedProduct,
      ...editForm,
    });
    handleClose();
  };

  const handleDelete = (productId) => {
    // Aquí irá tu lógica para "eliminar" (cambiar estado) el producto
    console.log("Eliminar producto:", productId);
  };

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Listado de Productos
        </Typography>
        <Filters />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID Producto</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.ProductoID}>
                  <TableCell>{product.ProductoID}</TableCell>
                  <TableCell>{product.Nombre}</TableCell>
                  <TableCell>{product.Marca}</TableCell>
                  <TableCell>{product.Categoria}</TableCell>
                  <TableCell>Q{product.Precio.toFixed(2)}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEditClick(product)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(product.ProductoID)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Modal de Edición */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Producto</DialogTitle>
        <DialogContent>
          <CardMedia
            component="img"
            sx={{
              height: 200,
              width: "100%",
              objectFit: "contain",
              marginTop: 2,
              marginBottom: 2,
            }}
            image={
              editForm.Foto
                ? `data:image/jpeg;base64,${editForm.Foto}`
                : "/placeholder.jpg"
            }
            alt={editForm.Nombre || "Imagen del producto"}
          />
          <TextField
            margin="dense"
            label="Nombre"
            name="Nombre"
            value={editForm.Nombre}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Marca"
            name="Marca"
            value={editForm.Marca}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Categoría"
            name="Categoria"
            value={editForm.Categoria}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Precio"
            name="Precio"
            type="number"
            value={editForm.Precio}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Stock"
            name="Stock"
            type="number"
            value={editForm.Stock}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Products;
