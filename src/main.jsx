import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FiltersProvider } from "./context/Product/FiltersState.jsx";

createRoot(document.getElementById("root")).render(
  <FiltersProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </FiltersProvider>
);
