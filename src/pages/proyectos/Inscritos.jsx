import { useMutation, useQuery } from '@apollo/client';
import { Dialog } from '@mui/material';
import { AccordionDetailsStyled } from 'components/Accordion';
import { AccordionSummaryStyled } from 'components/Accordion';
import { AccordionStyled } from 'components/Accordion';
import PrivateComponent from 'components/PrivateComponent';
import { useUser } from 'context/userContext'
import { EDITAR_DESCRIPCION } from 'graphql/avances/mutation';
import { CREAR_AVANCE } from 'graphql/avances/mutation';
import { AGREGAR_OBSERVACION } from 'graphql/avances/mutation';
import { GET_PROYECTOS_ESTUDIANTE } from 'graphql/inscripciones/queries';
import { GET_AVANCES_PROYECTO } from 'graphql/proyectos/queries';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Inscritos = () => {

    const { userData } = useUser()

    const { data: queryData, loading, refetch } = useQuery(GET_PROYECTOS_ESTUDIANTE, {
        variables: { _id: userData._id }
    });

    const [filtro, setFiltro] = useState("ACEPTADO")
    const [dataFiltrada, setDataFiltrada] = useState([])

    useEffect(() => {
        refetch()
    }, [])

    useEffect(() => {
        if (queryData && queryData.inscripcionesEstudiante) {
            setDataFiltrada(queryData.inscripcionesEstudiante.filter(e => (e.estado === filtro && !!e.fechaEgreso === false)))
        }
    }, [filtro, queryData])

    useEffect(() => {
        console.log(queryData)
    }, [queryData])

    if (loading) return <div>Cargando...</div>;

    if (queryData.inscripcionesEstudiante) {
        return (
            <div className='p-10 flex flex-col'>
                <div className='flex w-full items-center justify-center mb-4'>
                    <h1 className='text-2xl font-bold text-gray-900'>
                        Proyectos inscritos
                    </h1>
                </div>
                <div className="mb-4">
                    <button
                        onClick={() => setFiltro("ACEPTADO")}
                        className={`bg-blue-400 hover:bg-blue-600 px-2 py-2 mr-3 rounded-md text-white ${filtro === "ACEPTADO" && "bg-blue-600"}`}
                    >Aceptados</button>
                    <button
                        onClick={() => setFiltro("PENDIENTE")}
                        className={`bg-blue-400 hover:bg-blue-600 px-2 py-2 rounded-md text-white ${filtro === "PENDIENTE" && "bg-blue-600"}`}
                    >Pendientes</button>
                </div>
                {dataFiltrada.map((inscripcion) => {
                    return <AccordionProyecto inscripcion={inscripcion} />;
                })}
            </div>
        );
    }

    return <></>;
};

const AccordionProyecto = ({ inscripcion }) => {
    return (
        <>
            <AccordionStyled>
                <AccordionSummaryStyled expandIcon={<i className='fas fa-chevron-down' />}>
                    <div className='flex w-full justify-between'>
                        <div className='uppercase font-bold text-gray-100 '>
                            {inscripcion.proyecto.nombre} - {inscripcion.proyecto.estado} - {inscripcion.proyecto.fase}
                        </div>
                    </div>
                </AccordionSummaryStyled>
                <AccordionDetailsStyled>
                    <div className={`flex items-center mb-2 ${inscripcion.proyecto.fase === "TERMINADO" && "hidden"}`}>
                        <PrivateComponent roleList={["LIDER", "ESTUDIANTE"]}>
                            <div className={`${inscripcion.estado !== "ACEPTADO" && "hidden"}`}>
                                <Avances proyecto={inscripcion.proyecto} />
                            </div>
                        </PrivateComponent>
                    </div>
                    <div>Liderado Por: {inscripcion.proyecto.lider.nombre + " " + inscripcion.proyecto.lider.apellido}</div>
                    <div className='flex'>
                        {inscripcion.proyecto.objetivos.map((objetivo) => {
                            return <Objetivo tipo={objetivo.tipo} descripcion={objetivo.descripcion} />;
                        })}
                    </div>
                </AccordionDetailsStyled>
            </AccordionStyled>
        </>
    );
};

const Avances = ({ proyecto }) => {

    const { userData } = useUser()
    const [value, setValue] = useState("")
    const [show, setShow] = useState(false)
    const { data, loading, refetch } = useQuery(GET_AVANCES_PROYECTO, { variables: { _id: proyecto._id } })

    const [filtro, setFiltro] = useState("TODOS")
    const [dataFiltrada, setDataFiltrada] = useState([])

    const [crear, { data: mutationData, loading: mutationLoading }] = useMutation(CREAR_AVANCE)

    useEffect(() => {
        if (data && data.Proyecto) {
            if (filtro === "MIOS") {
                setDataFiltrada(data.Proyecto.avances.filter(e => e.creadoPor._id === userData._id))
            } else {
                setDataFiltrada(data.Proyecto.avances)
            }
        }
    }, [filtro,data,userData]);

    const submit = () => {
        if (value.length >= 4) {
            crear({
                variables: {
                    descripcion: value,
                    proyecto: proyecto._id,
                    creadoPor: userData._id
                }
            })
        } else {
            toast.error("El avance debe tener 4 caracteres como minimo")
        }
    }

    useEffect(() => {
        if (mutationData && mutationData.crearAvance) {
            toast.success("Avance agregado correctamente!")
            setValue("")
            refetch()
        }
    }, [mutationData])

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
                    <div className="border-b-2 pb-2 flex flex-col items-start sm:flex-row sm:items-center ">
                        <h1 className="text-xl">{`${proyecto.nombre} - Avances `}</h1>
                        <div className="mt-2 sm:mt-0 sm:ml-3">
                            <button
                                onClick={() => setFiltro("TODOS")}
                                className={`bg-blue-400 hover:bg-blue-600 px-2 py-1 text-white ${filtro === "TODOS" && "bg-blue-600"}`}
                            >TODOS</button>
                            <button
                                onClick={() => setFiltro("MIOS")}
                                className={`bg-blue-400 hover:bg-blue-600 px-1 py-1 text-white ${filtro === "MIOS" && "bg-blue-600"}`}
                            >MIOS</button>
                        </div>
                    </div>
                    <section className="w-full flex mt-2">
                        <input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="w-3/4 border-2"
                            placeholder="Agregar avance"
                            type="text" />
                        <button
                            onClick={submit}
                            className={`px-2 py-1 bg-blue-400 hover:bg-blue-600 text-white ${mutationLoading && "hidden"}`}>Agregar</button>
                    </section>
                    <section>
                        {
                            loading ?
                                (<div className="mt-10 w-full h-full flex items-center justify-center text-2xl">Cargando....</div>) :
                                dataFiltrada.length > 0 ?
                                    (
                                        <ul className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2">
                                            {
                                                dataFiltrada.map(e => (
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

const Avance = ({ avance, refetch }) => {

    const {userData} = useUser()
    const [show, setShow] = useState(false)
    const [edit, setEdit] = useState(false)
    const [value, setValue] = useState(avance.descripcion)

    const [editar, { data, loading }] = useMutation(EDITAR_DESCRIPCION)

    const submit = () => {
        if (value.length >= 4) {
            editar({
                variables: {
                    _id: avance._id,
                    descripcion: value
                }
            })
        } else {
            toast.error("La descripcion debe tener por lo menos 4 caracteres")
        }
    }

    useEffect(() => {
        if(data && data.editarDescripcion){
            toast.success("Descripción editada correctamente!")
            refetch()
            setEdit(false)
        }
    },[data,refetch])

    return (
        <li className="bg-gray-300 p-3 rounded-md">
            <div className="border-b-2 pb-2">
                <h2 className="capitalize font-bold">
                    {"By: " + avance.creadoPor.nombre + " " + avance.creadoPor.apellido}
                    <i
                        onClick={() => setEdit(!edit)}
                        className={`fa fa-${edit ? "times" : "edit"} ${userData._id === avance.creadoPor._id||"hidden"} ml-2 text-lg text-blue-400 hover:text-blue-600 cursor-pointer`}></i>
                </h2>
            </div>
            <p className={`my-1 ${edit && "hidden"}`}>
                {avance.descripcion}
            </p>
            <section className={`${edit || "hidden"} my-1 flex`}>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type="text" />
                <button 
                onClick={submit}
                className="bg-green-300 hover:bg-green-500 px-1">
                    <i className="fa fa-check"></i>
                </button>
            </section>
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
            </ul>
        </li>
    )
}

const Objetivo = ({ tipo, descripcion }) => {
    return (
        <div className='mx-5 my-4 bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center shadow-xl'>
            <div className='text-lg font-bold'>{tipo}</div>
            <div>{descripcion}</div>
        </div>
    );
};



export default Inscritos
