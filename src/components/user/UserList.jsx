import React, { useEffect } from "react";
import { useContext } from "react";
import UserContext from "../../context/User/UserContext";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Profile from "./Profile";

const UserList = () => {
  const { users, getUsers, getProfile } = useContext(UserContext);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
    <Profile />
    <List>
      {users.map((user) => (
        <ListItem key={user.UsuarioID} disablePadding>
          <ListItemButton onClick={() => getProfile(user.UsuarioID)}>
            <ListItemText
              primary={user.NombreCompleto}
              secondary={`Correo: ${user.CorreoElectronico} Rol:${user.Rol}`}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    </>
    
  );
};

export default UserList;
