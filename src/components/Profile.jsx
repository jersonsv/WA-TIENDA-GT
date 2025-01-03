import React, { useContext, useEffect } from "react";
import UserContext from "../context/User/UserContext";

const Profile = () => {
    const { selectedUser } = useContext(UserContext)

    const user = selectedUser && selectedUser.length > 0 ? selectedUser[0] : null;
    return (
        <>
            {selectedUser ? 
            (<div className="card card-body text-center"> 
                <h1>{`${user.NombreCompleto} ${user.CorreoElectronico}`}</h1>
                <h3>Telefono: {user.Telefono}</h3>
            </div>): (<h1>No user selected </h1>)} 
        </>
    )
}

export default Profile;