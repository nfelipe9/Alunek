import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';
import { useUser } from 'context/userContext';

const IndexUsuarios = () => {
  const { data, error, loading } = useQuery(GET_USUARIOS);
  const [dataFiltrada,setDataFiltrada] = useState([])
  
  const {userData} = useUser()

  useEffect(() => {
    if (error) {
      toast.error('Error consultando los usuarios');
    }
  }, [error]);

  useEffect(() => {
    if(data && data.Usuarios){
      if(userData.rol ==="ADMINISTRADOR"){
        setDataFiltrada(data.Usuarios)
      }else if(userData.rol === "LIDER"){
        setDataFiltrada(data.Usuarios.filter(e=>e.rol==="ESTUDIANTE"))
      }else{
        setDataFiltrada([])
      }
    }
  },[data])

  if (loading) return <div>Cargando....</div>;

  return (
    <PrivateRoute roleList={['ADMINISTRADOR',"LIDER"]}>
      <div>
        Datos Usuarios:
        <table className='tabla'>
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>APELLIDO</th>
              <th>CORREO</th>
              <th>IDENTIFICACIÓN</th>
              <th>ROL</th>
              <th>ESTADO</th>
              <th>EDITAR</th>
            </tr>
          </thead>
          <tbody>
            {data && data.Usuarios ? (
              <>
                {dataFiltrada.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td>{u.nombre}</td>
                      <td>{u.apellido}</td>
                      <td>{u.correo}</td>
                      <td>{u.identificacion}</td>
                      <td>{Enum_Rol[u.rol]}</td>
                      <td>{Enum_EstadoUsuario[u.estado]}</td>
                      <td>
                        <Link to={`/usuarios/editar/${u._id}`}>
                          <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <div>No autorizado</div>
            )}
          </tbody>
        </table>
      </div>
    </PrivateRoute>
  );
};

export default IndexUsuarios;
