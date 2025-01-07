import { Filters } from "./Filters";
import { AppBar, Toolbar } from "@mui/material";

export function Header() {


  return (
    <AppBar position="static">
      <h1>Shopping Cart</h1>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Filters />
      </Toolbar>
    </AppBar>
  );
}
