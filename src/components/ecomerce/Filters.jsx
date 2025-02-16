import {
  Box,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
} from "@mui/material";
import { useFilters } from "../../hooks/useFilters";

export function Filters() {
   const { filters, setFilters } = useFilters()//estado global 1ra fuente

  const handleChangeMinPrice = (_, newValue) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: newValue,
    }));
  };

  const handleChangeCategory = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      category: event.target.value,
    }));
  };

  // Estilos comunes para componentes blancos
  const whiteStyle = {
    color: "white",
    borderColor: "white",
  };

  return (
    <Stack direction="row" spacing={4} sx={{ p: 2 }}>
      {/* Sección del Slider */}
      <Box width={250}>
        <p >Precio a partir de: Q{filters.minPrice}</p>
        <Slider
          value={filters.minPrice}
          onChange={handleChangeMinPrice}
          min={0}
          max={1000}
        />
      </Box>

      {/* Sección del Select */}
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Categoría</InputLabel>
        <Select
          defaultValue="all"
          label="Categoría"
          onChange={handleChangeCategory}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "blue" },
          }}
        >
          <MenuItem value="all">Todas</MenuItem>
          <MenuItem value="DETERGENTE">Detergentes</MenuItem>
          <MenuItem value="REFRESCO">Refrescos</MenuItem>
          <MenuItem value="DULCES">Dulces</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
