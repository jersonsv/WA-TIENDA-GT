import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Alert,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useClient } from "../hooks/useClient"

export function Formulario() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { getClient, selectClient, clients } = useClient(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      
      const response = await login(formData)
  
      if (response.success) {
      console.log("Usuario autenticado:", response.user);
       // Agregar un pequeño delay para asegurar que el token está guardado
      //await new Promise(resolve => setTimeout(resolve, 100));
      //await getClient( response.user.clienteId );

      navigate(response.user.rolId === 1 ? "/operador" : "/cliente");
      } else {
        setError(response.message);
      } 
    } catch (err) {
      setError("Error de conexión. Por favor, intente más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Estado selectClient actualizado:", selectClient);
  }, [selectClient]);

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <Typography
            component="h1"
            variant="h5"
            sx={{ textAlign: "center", mb: 2 }}
          >
            Iniciar Sesión
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="correo"
              label="Correo Electrónico"
              name="correo"
              autoComplete="email"
              autoFocus
              value={formData.correo}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="contrasena"
              label="Contraseña"
              type="password"
              id="contrasena"
              autoComplete="current-password"
              value={formData.contrasena}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
