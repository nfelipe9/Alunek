import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import DropDown from 'components/Dropdown';
import { Enum_EstadoUsuario, Enum_EstadoUsuarioLider } from 'utils/enums';
import { useUser } from 'context/userContext'
import { useState } from 'react';

const EditarUsuario = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();
  const { userData } = useUser();
  const navigate = useNavigate();
  const [sameUser] = useState(userData._id === _id)

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: { _id },
  });


  const [editarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_USUARIO);

  const submitForm = (e) => {
    e.preventDefault();
    delete formData.rol;
    editarUsuario({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Usuario modificado correctamente');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el usuario');
    }

    if (queryError) {
      toast.error('Error consultando el usuario');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <i 
      onClick={()=>{navigate(-1)}}
      className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>{`${sameUser ? "Mi información" : "Editar Usuario"}`}</h1>
      <h2 className='m-4 text-3xl text-gray-800 font-bold text-center'>{queryData.Usuario.nombre} {queryData.Usuario.apellido}</h2>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
        <div className={`${sameUser || "hidden"}`}>
          <Input
            label='Nombre de la persona:'
            type='text'
            name='nombre'
            defaultValue={queryData.Usuario.nombre}
            required={true}
          />
          <Input
            label='Apellido de la persona:'
            type='text'
            name='apellido'
            defaultValue={queryData.Usuario.apellido}
            required={true}
          />
          <Input
            label='Correo de la persona:'
            type='email'
            name='correo'
            defaultValue={queryData.Usuario.correo}
            required={true}
          />
          <Input
            label='Identificación de la persona:'
            type='text'
            name='identificacion'
            defaultValue={queryData.Usuario.identificacion}
            required={true}
          />
        </div>
        <div className={`${sameUser && "hidden"}`}>
          <DropDown
            label='Estado de la persona:'
            name='estado'
            defaultValue={queryData.Usuario.estado}
            required={true}
            options={userData.rol === "ADMINISTRADOR" ? Enum_EstadoUsuario : Enum_EstadoUsuarioLider}
          />
        </div>
        <span>Rol del usuario: {queryData.Usuario.rol}</span>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text='Confirmar'
        />
      </form>
    </div>
  );
};

export default EditarUsuario;
