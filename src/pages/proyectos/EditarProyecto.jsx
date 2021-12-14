import { useMutation, useQuery } from '@apollo/client'
import ButtonLoading from 'components/ButtonLoading'
import Input from 'components/Input'
import { EDITAR_PROYECTO } from 'graphql/proyectos/mutations'
import { GET_PROYECTO } from 'graphql/proyectos/queries'
import useFormData from 'hooks/useFormData'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditarProyecto = () => {

    const navigate = useNavigate();
    const { _id } = useParams()
    const { data, loading } = useQuery(GET_PROYECTO, { variables: { _id } })
    const [editar, { data: mutationData, loading: mutationLoading, error }] = useMutation(EDITAR_PROYECTO)

    const { form, formData, updateFormData } = useFormData();

    const [especificos, setEspecificos] = useState([])
    const [generales, setGenerales] = useState([])
    const [objetivos, setObjetivos] = useState([])

    useEffect(() => {
        if (data && data.Proyecto) {
            setEspecificos(data.Proyecto.objetivos.filter(e => e.tipo === "ESPECIFICO"))
            setGenerales(data.Proyecto.objetivos.filter(e => e.tipo === "GENERAL"))
        }
    }, [data])

    useEffect(() => {
        if(mutationData && mutationData.editarProyecto){
            navigate("/proyectos")
            toast.success("Proyecto editado correctamente")
        }
    },[mutationData])

    const submit = (e) => {
        e.preventDefault();
        console.log("objetivos:", objetivos)
        editar({
            variables: {
                _id,
                campos: {
                    nombre: formData.nombre,
                    presupuesto: Number(formData.presupuesto),
                    objetivos: [...generales.map((e, i) => (
                        {
                            descripcion: formData[`general${i + 1}`],
                            tipo: "GENERAL"
                        }
                    )), ...especificos.map((e, i) => (
                        {
                            descripcion: formData[`especifico${i + 1}`],
                            tipo: "ESPECIFICO"
                        }
                    ))]
                }
            }
        })
    }

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center text-4xl">
                Loading...
            </div>
        )
    }

    return (
        <div className="p-10">
            <div className='p-10 flex flex-col items-center'>
                <div className='self-start'>
                    <Link to='/proyectos'>
                        <i className='fas fa-arrow-left' />
                    </Link>
                </div>
                <h1 className='text-2xl font-bold text-gray-900'>{`Editar proyecto "${data.Proyecto.nombre}"`}</h1>
                <form ref={form} onChange={updateFormData} onSubmit={submit}>
                    <Input
                        name='nombre'
                        label='Nombre del Proyecto'
                        required={true}
                        type='text'
                        defaultValue={data.Proyecto.nombre}
                    />
                    <Input
                        name='presupuesto'
                        label='Presupuesto del Proyecto'
                        required={true}
                        type='number'
                        defaultValue={data.Proyecto.presupuesto}
                    />
                    {
                        generales.map((e, i) => (
                            <Input
                                name={`general${i + 1}`}
                                label={"Objetivo general"}
                                required={true}
                                type='text'
                                defaultValue={e.descripcion}
                            />
                        ))
                    }
                    {
                        especificos.map((e, i) => (
                            <Input
                                name={`especifico${i + 1}`}
                                label={"Objetivo especifico"}
                                required={true}
                                type='text'
                                defaultValue={e.descripcion}
                            />
                        ))
                    }
                    <div className='relative left-2'>
                        <ButtonLoading text='Editar proyecto' loading={false} disabled={Object.keys(formData).length === 0} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditarProyecto
