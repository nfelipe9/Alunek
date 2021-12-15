import { useUser } from 'context/userContext'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();
    const {userData} = useUser()

    console.log(userData)

    return (
        <header className="bg-gray-200 py-2 mb-1 sticky top-0 hidden md:flex justify-start items-center px-4 border-l-2 border-white z-10">
            <div className="border-b-2 border-blue-400 pb-1">
            <span className="capitalize">{userData.nombre} {userData.apellido}</span> - {userData.rol}
            <i 
            onClick={()=>{navigate(`/usuarios/editar/${userData._id}`)}}
            className="cursor-pointer fas fa-user ml-2 bg-blue-400 rounded-full p-2"></i>
            </div>
        </header>
    )  
}

export default Header
