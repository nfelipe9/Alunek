import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { PROYECTOS } from 'graphql/proyectos/queries';
import DropDown from 'components/Dropdown';
import { Dialog } from '@mui/material';
import { Enum_EstadoProyecto } from 'utils/enums';
import ButtonLoading from 'components/ButtonLoading';
import { EDITAR_PROYECTO } from 'graphql/proyectos/mutations';
import useFormData from 'hooks/useFormData';
import PrivateComponent from 'components/PrivateComponent';
import { Link, useNavigate } from 'react-router-dom';
import { CREAR_INSCRIPCION } from 'graphql/inscripciones/mutaciones';
import { useUser } from 'context/userContext';
import { toast } from 'react-toastify';
import { TERMINAR_PROYECTO } from 'graphql/proyectos/mutations';
import {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled,
} from 'components/Accordion';
import { GET_AVANCES_PROYECTO } from 'graphql/proyectos/queries';
import { AGREGAR_OBSERVACION } from 'graphql/avances/mutation';

const IndexProyectos = () => {

  const { userData } = useUser()

  const { data: queryData, loading, error, refetch } = useQuery(PROYECTOS);
  const [dataFiltrada, setDataFiltrada] = useState([])

  useEffect(() => {
    console.log("Haciendo refetching");
    refetch()
  }, [refetch])

  useEffect(() => {

    if (queryData && queryData.Proyectos) {
      if (userData.rol === "ADMINISTRADOR") {
        setDataFiltrada(queryData.Proyectos)
      } else if (userData.rol === "LIDER") {
        setDataFiltrada(queryData.Proyectos.filter(e => e.lider._id === userData._id))
      } else if (userData.rol === "ESTUDIANTE") {
        setDataFiltrada(queryData.Proyectos.filter(e => e.estado === "ACTIVO"))
      }
    }

  }, [queryData,userData]);

  if (loading) return <div>Cargando...</div>;

  if (queryData.Proyectos) {
    return (
      <div className='p-10 flex flex-col'>
        <div className='flex w-full items-center justify-center mb-4'>
          <h1 className='text-3xl font-bold text-gray-900'>
            {`${userData.rol === "LIDER" ? "Mis proyectos" : userData.rol === "ADMINISTRADOR" ? "Proyectos creados" : "Proyectos disponibles"}`}
          </h1>
        </div>
        <PrivateComponent roleList={['LIDER']}>
          <div className='my-2 self-end'>
            <button className='bg-blue-400 text-gray-50 p-2 rounded-lg shadow-lg hover:bg-blue-700'>
              <Link to='/proyectos/nuevo'>Crear nuevo proyecto</Link>
            </button>
          </div>
        </PrivateComponent>
        {dataFiltrada.map((proyecto) => {
          return <AccordionProyecto proyecto={proyecto} />;
        })}
      </div>
    );
  }

  return <></>;
};

const AccordionProyecto = ({ proyecto }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showTerminar, setShowTerminar] = useState(false)
  const navigate = useNavigate();
  return (
    <>
      <AccordionStyled>
        <AccordionSummaryStyled expandIcon={<i className='fas fa-chevron-down' />}>
          <div className='flex w-full justify-between'>
            <div className='uppercase font-bold text-gray-100 '>
              {proyecto.nombre} - {proyecto.estado} - {proyecto.fase}
            </div>
          </div>
        </AccordionSummaryStyled>
        <AccordionDetailsStyled>
          <div className={`flex items-center mb-2 ${proyecto.fase === "TERMINADO" && "hidden"}`}>
            <PrivateComponent roleList={['ADMINISTRADOR']}>
              <i
                className='mx-4 fas fa-pen text-yellow-600 hover:text-yellow-400'
                onClick={() => {
                  setShowDialog(true);
                }}
              />
            </PrivateComponent>
            <PrivateComponent roleList={['ADMINISTRADOR', "LIDER"]}>
              <div onClick={() => setShowTerminar(true)} className="bg-red-400 px-2 py-1 rounded-sm hover:bg-red-600 cursor-pointer text-white">
                Terminar
              </div>
            </PrivateComponent>
            <PrivateComponent roleList={["LIDER"]}>
              <button
                onClick={() => navigate(`/proyectos/${proyecto._id}`)}
                className={`ml-3 bg-blue-400 px-2 py-1 rounded-sm hover:bg-blue-600 cursor-pointer text-white ${proyecto.estado === "INACTIVO" && "hidden"}`}>
                Editar
              </button>
            </PrivateComponent>
            <PrivateComponent roleList={["LIDER", "ESTUDIANTE"]}>
              <Avances proyecto={proyecto} />
            </PrivateComponent>
          </div>
          <PrivateComponent roleList={['ESTUDIANTE']}>
            <InscripcionProyecto
              idProyecto={proyecto._id}
              estado={proyecto.estado}
              inscripciones={proyecto.inscripciones}
            />
          </PrivateComponent>
          <div className="relative left-3 mt-1 font-bold text-lg">Liderado Por: {proyecto.lider.nombre + " " + proyecto.lider.apellido}</div>
          <div className='flex'>
            {proyecto.objetivos.map((objetivo) => {
              return <Objetivo tipo={objetivo.tipo} descripcion={objetivo.descripcion} />;
            })}
          </div>
        </AccordionDetailsStyled>
      </AccordionStyled>
      <Dialog
        open={showDialog}
        onClose={() => {
          setShowDialog(false);
        }}
      >
        <FormEditProyecto _id={proyecto._id} />
      </Dialog>
      <Dialog
        open={showTerminar}
        onClose={() => {
          setShowTerminar(false);
        }}
      >
        <TerminarProyecto proyecto={proyecto} setShowTerminar={setShowTerminar} />
      </Dialog>
    </>
  );
};

const Avances = ({ proyecto }) => {

  const [show, setShow] = useState(false)
  const { data, loading,refetch } = useQuery(GET_AVANCES_PROYECTO, { variables: { _id: proyecto._id } })

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className={`ml-3 bg-green-400 px-2 py-1 rounded-sm hover:bg-green-600 cursor-pointer text-white ${proyecto.estado === "INACTIVO" && "hidden"}`}>
        Avances
      </button>
      <Dialog
        open={show}
        onClose={() => setShow(false)}
      >
        <div className="p-10">
          <h1 className="text-xl border-b-2 pb-2">{`${proyecto.nombre} - Avances `}</h1>
          <section>
            {
              loading ?
                (<div className="mt-10 w-full h-full flex items-center justify-center text-2xl">Cargando....</div>) :
                data.Proyecto.avances.length > 0 ?
                  (
                    <ul className="mt-4">
                      {
                        data.Proyecto.avances.map(e => (
                          <Avance avance={e} refetch={refetch} />
                        ))
                      }
                    </ul>
                  ) :
                  (<div className="mt-4 bg-red-400 p-5 rounded-full text-white text-center text-xl font-bold">No hay avances</div>)
            }
          </section>
        </div>
      </Dialog>
    </>
  )
}

const Avance = ({ avance,refetch }) => {

  const [show, setShow] = useState(false)
  const [openInput,setOpenInput] = useState(false)
  const [value,setValue] = useState("")
  const [agregar,{data, loading, error}] = useMutation(AGREGAR_OBSERVACION)

  const submit = () =>{
    agregar({variables:{
      id:avance._id,
      observaciones:[...avance.observaciones,value]
    }})
  }

  useEffect(() => {
    if(data && data.agregarObservaciones){
      toast.success("Observacion agregada")
      refetch()
      setOpenInput(false)
      setValue("")
    }
  },[data])

  return (
    <li className="bg-gray-300 p-3 rounded-md">
      <h2 className="capitalize font-bold">{avance.creadoPor.nombre + " " + avance.creadoPor.apellido}</h2>
      <p className="border-t-2 my-2">
        {avance.descripcion}
      </p>
      <p>
        {"Creado: " + avance.fecha}
      </p>
      <button
        className="mt-1"
        onClick={() => setShow(!show)}
      >
        Observaciones <i className={`fas fa-chevron-${!show ? "down" : "up"}`}></i>
      </button>
      <ul className={`mt-2 ml-3 ${show || "hidden"}`}>
        {
          avance.observaciones.map(e => (
            <li>
              <i className="fas fa-check mr-2"></i>{e}
            </li>
          ))
        }
        <i 
        onClick={() =>setOpenInput(true)}
        className={`fa fa-plus bg-blue-300 hover:bg-blue-400 p-1 rounded-full cursor-pointer ${openInput&&"hidden"}`}></i>
        <label className={`${openInput||"hidden"}`}>
          <input 
          value={value}
          onChange={(e)=>setValue(e.target.value)}
          required type="text" className="rounded-sm p-1" />
          <button 
          onClick={submit}
          className="bg-blue-300 hover:bg-blue-400 p-1 text-white">Agregar</button>
        </label>
      </ul>
    </li>
  )
}

const TerminarProyecto = ({ proyecto, setShowTerminar }) => {

  const [terminar, { data, loading, error }] = useMutation(TERMINAR_PROYECTO)

  const submit = () => {
    terminar({ variables: { _id: proyecto._id } })
  }

  useEffect(() => {
    if (data && data.terminarProyecto) {
      toast.success("Proyecto terminado correctamente")
      setShowTerminar(false)
      setTimeout(() => {
        window.location.reload()
      }, [500])
    }
  }, [data, setShowTerminar])

  return (
    <div className="p-10">
      <h1 className="text-xl border-b-2 pb-2">{`¿Desea cambiar la fase del proyeto "${proyecto.nombre}" a terminado?`}</h1>
      {
        loading ?
          (
            <div className="text-xl mt-3 text-blue-400">Cargando...</div>
          ) :
          (
            <button
              onClick={submit}
              className="bg-blue-400 py-2 px-4 mt-3 hover:bg-blue-600 text-gray-900 font-bold">ACEPTAR</button>
          )
      }
    </div>
  )

}

const FormEditProyecto = ({ _id }) => {
  const { form, formData, updateFormData } = useFormData();
  const [editarProyecto, { data: dataMutation, loading, error }] = useMutation(EDITAR_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
    editarProyecto({
      variables: {
        _id,
        campos: formData,
      },
    });
  };

  useEffect(() => {
    console.log('data mutation', dataMutation);
  }, [dataMutation]);

  return (
    <div className='p-4'>
      <h1 className='font-bold'>Modificar Estado del Proyecto</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col items-center'
      >
        <DropDown label='Estado del Proyecto' name='estado' options={Enum_EstadoProyecto} />
        <ButtonLoading disabled={false} loading={loading} text='Confirmar' />
      </form>
    </div>
  );
};

const Objetivo = ({ tipo, descripcion }) => {
  return (
    <div className='mx-5 my-4 bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center shadow-xl'>
      <div className='text-lg font-bold'>{tipo}</div>
      <div>{descripcion}</div>
    </div>
  );
};

const InscripcionProyecto = ({ idProyecto, estado, inscripciones }) => {
  const [estadoInscripcion, setEstadoInscripcion] = useState('');
  const [crearInscripcion, { data, loading, error }] = useMutation(CREAR_INSCRIPCION);
  const { userData } = useUser();

  useEffect(() => {
    if (userData && inscripciones) {
      const flt = inscripciones.filter((el) => el.estudiante._id === userData._id);
      if (flt.length > 0) {
        setEstadoInscripcion(flt[0].estado);
      }
    }
  }, [userData, inscripciones]);

  useEffect(() => {
    if (data) {
      console.log(data);
      toast.success('inscripcion creada con exito');
    }
  }, [data]);

  const confirmarInscripcion = () => {
    crearInscripcion({ variables: { proyecto: idProyecto, estudiante: userData._id } });
  };

  return (
    <>
      {estadoInscripcion !== '' ? (
        <div
        className="bg-red-400 text-white p-2 relative left-3 inline-block"
        >Ya estas inscrito en este proyecto y el estado es {estadoInscripcion}</div>
      ) : (
        <ButtonLoading
          onClick={() => confirmarInscripcion()}
          disabled={estado === 'INACTIVO'}
          loading={loading}
          text='Inscribirme en este proyecto'
        />
      )}
    </>
  );
};

export default IndexProyectos;
