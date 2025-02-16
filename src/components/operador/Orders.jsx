import React, { useEffect } from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from "@mui/material";
import { useOrden } from "../../hooks/useOrden";

const Orders = () => {
  const { getOrdenes, ordenes, updateStateOrden } = useOrden();
  
  useEffect(() => {
    getOrdenes();
  }, []);

  const handleEntrega = async (ordenId) => {
    try {
      updateStateOrden({
        ordenID: ordenId,
        estadoID: 4
      });
      getOrdenes(); // Recargar la lista después de actualizar
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Historial de Pedidos
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Pedido</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordenes.map((orden) => (
              <TableRow key={orden.OrdenID}>
                <TableCell>{orden.OrdenID}</TableCell>
                <TableCell>{orden.NombreCompleto}</TableCell>
                <TableCell>
                  {new Date(orden.FechaEntrega).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {orden.EstadoID === 3
                    ? "ENTREGAR"
                    : orden.EstadoID === 4  
                    ? "CONFIRMADO"
                    : "Desconocido"}
                </TableCell>
                <TableCell>Q{orden.TotalOrden.toFixed(2)}</TableCell>
                <TableCell align="right">
                  {orden.EstadoID !== 4 && (
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={() => handleEntrega(orden.OrdenID)}
                    >
                      Entregar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Orders;
