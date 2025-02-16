import React, { useEffect } from "react";
import { useCategory } from "../../hooks/useCategory"
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
    CardMedia
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";



const Category = () => {
  const { getCategorys, addCategory, updateCategory, deleteCategory, categorys } = useCategory();
  
  useEffect(() => {
    getCategorys();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await deleteCategory({
        categoriaProductoID: productId,
        estadoID: 2
      })
      console.log("Eliminar producto:", productId);
      await getCategorys();
    } catch (error) {
      console.log('Error al eliminar categoria: ', error.message)
    }
   
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Categorias
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>CategoriaProductoID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>EstadoID</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorys.map((category) => (
              <TableRow key={category.CategoriaProductoID}>
                <TableCell>{category.CategoriaProductoID}</TableCell>
                <TableCell>{category.Nombre}</TableCell>
                <TableCell>{category.Estado}</TableCell>
                <TableCell>
                    <IconButton
                      onClick={() => handleEditClick(category)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(category.CategoriaProductoID)}
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
  );
};

export default Category;
