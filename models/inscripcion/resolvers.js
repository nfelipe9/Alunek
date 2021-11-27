import { InscriptionModel } from './inscripcion.js';

const resolverInscripciones = {
    Query: {
        Inscripciones: async(parent, args) => {
            const inscripciones = await InscriptionModel.find().populate('estudiante');
            return inscripciones;
        },

        ProyectosInscripciones: async(parent, args) => {
            const Proyectos_Inscripciones = await InscriptionModel.find().populate('proyecto');
            return Proyectos_Inscripciones;
        },
    },
    Mutation: {
        crearInscripcion: async(parent, args) => {
            const inscripcionCreada = await InscriptionModel.create({
                estado: args.estado,
                proyecto: args.proyecto,
                estudiante: args.estudiante,
            });
            return inscripcionCreada;
        },
        aprobarInscripcion: async(parent, args) => {
            const inscripcionAprobada = await InscriptionModel.findByIdAndUpdate(
                args.id, {
                    estado: 'ACEPTADO',
                    fechaIngreso: Date.now(),
                }, { new: true }
            );
            return inscripcionAprobada;
        },
    },
};

export { resolverInscripciones };