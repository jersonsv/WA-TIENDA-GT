import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formulario } from "./components/Formulario.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { OperadorDashboard } from "./components/operador/Dashboard";
import { ClienteDashboard } from "./components/cliente/Dashboard";

 const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <Container component="main">
            <Routes>
              <Route path="/login" element={<Formulario />} />
              <Route path="/operador" element={<OperadorDashboard />} />
              <Route path="/cliente" element={<ClienteDashboard />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </Container>   
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
