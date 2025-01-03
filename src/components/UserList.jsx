import React, { useEffect } from "react";
import { useContext } from "react";
import UserContext from "../context/User/UserContext";

const UserList = () => {
  const { users, getUsers, getProfile} = useContext(UserContext);

  useEffect(() => {
    getUsers();
    console.log("Aqui" + users);
  }, []);

  

  return (
    <div className="list-group h-100">
      {users.map((user) => (
        <a className="list-group-item list-group-item-action d-flex flex-row justify-content-start" href="#!" key={user.UsuarioID} onClick={() => getProfile(user.UsuarioID)}>
            <p>
                {`${user.UsuarioID} ${user.NombreCompleto} ${user.CorreoElectronico}`}
            </p>
        </a>
      ))}
    </div>
  );
};

export default UserList;
