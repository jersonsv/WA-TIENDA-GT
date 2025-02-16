import React, { useEffect, useState } from "react";
import { useEstado } from "../../hooks/useEstado";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add"; // Icono para el botón "Crear"

const Estado = () => {
  const { getEstados, addEstado, updateEstado, deleteEstado, estados } =
    useEstado();

  // Eliminar estado
  const handleDelete = async (estadoId) => {
    try {
      await deleteEstado(estadoId);
      await getEstados();
    } catch (error) {
      console.log("Error al eliminar estado: ", error.message);
    }
  };

  /* Lógica para el modal */
  const [open, setOpen] = useState(false);
  const [selectedEstado, setSelectedEstado] = useState(null);
  const [editForm, setEditForm] = useState({
    Nombre: "",
  });
  const [isCreating, setIsCreating] = useState(false);

  // Abrir modal para editar
  const handleEditClick = (estado) => {
    setSelectedEstado(estado);
    setEditForm({
      Nombre: estado.Nombre,
    });
    setIsCreating(false);
    setOpen(true);
  };

  // Abrir modal para crear
  const handleCreateClick = () => {
    setSelectedEstado(null);
    setEditForm({
      Nombre: "", // Reiniciar el formulario
    });
    setIsCreating(true);
    setOpen(true);
  };

  // Cerrar modal
  const handleClose = () => {
    setOpen(false);
    setSelectedEstado(null);
    setIsCreating(false);
  };

  // Manejar cambios en los inputs del modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Guardar cambios
  const handleSave = async () => {
    try {
      if (isCreating) {
        const nuevoEstado = {
          estadoNombre: editForm.Nombre,
        };
        await addEstado(nuevoEstado);
      } else {
        const estadoActualizado = {
          estadoID: selectedEstado.EstadoID,
          estadoNombre: editForm.Nombre,
        };
        await updateEstado(estadoActualizado);
      }
      await getEstados();
      handleClose();
    } catch (error) {
      console.log("Error al guardar estado: ", error.message);
    }
  };

  useEffect(() => {
    getEstados();
  }, []);

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Estados
          {/* Botón para crear un nuevo estado */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateClick}
            sx={{ float: "right" }}
          >
            Crear
          </Button>
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>EstadoID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {estados.map((estado) => (
                <TableRow key={estado.EstadoID}>
                  <TableCell>{estado.EstadoID}</TableCell>
                  <TableCell>{estado.Nombre}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEditClick(estado)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(estado.EstadoID)}
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

      {/* Modal de Edición/Creación */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {isCreating ? "Crear Estado" : "Editar Estado"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nombre"
            name="Nombre"
            value={editForm.Nombre}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">
            {isCreating ? "Crear" : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Estado;