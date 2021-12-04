import { ProjectModel } from './proyecto.js';

const resolversProyecto = {
    Query: {
        Proyectos: async(parent, args) => {
            const proyectos = await ProjectModel.find().populate('avances').populate('inscripciones').populate('lider');
            return proyectos;
        },

        ProyectosUsuarios: async(parent, args) => {
            const ProyectosUsuarios = await ProjectModel.find().populate('lider');
            return ProyectosUsuarios;
        },

    },
    Mutation: {
        crearProyecto: async(parent, args) => {
            const proyectoCreado = await ProjectModel.create({
                nombre: args.nombre,
                estado: args.estado,
                fase: args.fase,
                fechaInicio: args.fechaInicio,
                fechaFin: args.fechaFin,
                presupuesto: args.presupuesto,
                lider: args.lider,
                objetivos: args.objetivos,
            });
            return proyectoCreado;
        },
        editarProyecto: async (parent, args) => {
            const proyectoEditado = await ModeloProyectos.findByIdAndUpdate(
                args._id,
                { 
                    nombre: args.nombre,
                    estado: args.estado,
                    fase: args.fase,
                    fechaInicio: args.fechaInicio,
                    fechaFin: args.fechaFin,
                    presupuesto: args.presupuesto,
                    lider: args.lider,
                    objetivos: args.objetivos,
                },
                { new: true}
            );
            return proyectoEditado;
        }
    },
};

export { resolversProyecto };