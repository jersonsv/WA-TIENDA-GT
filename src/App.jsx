import "bootstrap/dist/css/bootstrap.min.css";
import { Formulario } from "./components/Login.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { OperadorDashboard } from "./components/operador/Dashboard";
import { ClienteDashboard } from "./components/cliente/Dashboard";
import ProductState from "./context/Product/ProductState";
import { CartProvider } from "./context/Cart/cart.jsx";
import UserState from "./context/User/UserState.jsx";
import AuthState from "./context/Auth/AuthState.jsx";
import ClientState from "./context/Client/ClientState.jsx";
import OrdenState from "./context/Orden/OrdenState.jsx";
import CategoryState from "./context/Category/CategoryState.jsx";
import EstadoState from "./context/Estado/EstadoState.jsx";

const theme = createTheme();

function App() {
  return (
    <AuthState>
      <ClientState>
        <UserState>
          <EstadoState>
            <CategoryState>
              <CartProvider>
                <ProductState>
                  <OrdenState>
                    <ThemeProvider theme={theme}>
                      <CssBaseline>
                        <BrowserRouter>
                          <Container component="main">
                            <Routes>
                              <Route path="/login" element={<Formulario />} />
                              <Route
                                path="/operador"
                                element={<OperadorDashboard />}
                              />
                              <Route
                                path="/cliente"
                                element={<ClienteDashboard />}
                              />
                              <Route
                                path="/"
                                element={<Navigate to="/login" replace />}
                              />
                            </Routes>
                          </Container>
                        </BrowserRouter>
                      </CssBaseline>
                    </ThemeProvider>
                  </OrdenState>
                </ProductState>
              </CartProvider>
            </CategoryState>
          </EstadoState>
        </UserState>
      </ClientState>
    </AuthState>
  );
}

export default App;
