import { ModeloAvance } from './avance.js';

const resolversAvance = {
    Query: {
        Avances: async(parent, args) => {
            const avances = await ModeloAvance.find().populate('proyecto').populate('creadoPor');
            return avances;
        },
        filtrarAvance: async(parents, args) => {
            const avanceFiltrado = await ModeloAvance.find({ proyecto: args._id })
                .populate('proyecto')
                .populate('creadoPor');
            return avanceFiltrado;
        },
    },
    Mutation: {
        crearAvance: async(parents, args) => {
            const avanceCreado = ModeloAvance.create({
                fecha: args.fecha,
                descripcion: args.descripcion,
                proyecto: args.proyecto,
                creadoPor: args.creadoPor,
            })
            return avanceCreado;
        },
        editarAvance: async(parents, args) => {
            const editarAvance = await ModeloAvance.findByIdAndUpdate(
                args._id, {
                    fecha: args.fecha,
                    proyecto: args.proyecto,
                    descripcion: args.descripcion,
                    creadoPor: args.creadoPor,
                }, { new: true }
            );
            return editarAvance;
        },

        editarAvanceEstudiante: async(parent, args) => {
            const editarAvanceEstudiante =
                await ModeloAvance.findByIdAndUpdate(args._id, {
                    descripcion: args.descripcion,
                }, { new: true });

            return editarAvanceEstudiante;

        },
        eliminarAvance: async(parents, args) => {
            if (Object.keys(args).includes('_id')) {
                const avanceEliminado = await ModeloAvance.findOneAndDelete({ _id: args._id });
                return avanceEliminado;
            } else if (Object.keys(args).includes('descripcion')) {
                const usuarioEliminado = await ModeloUsuarios.findOneAndDelete({ descripcion: args.descripcion });
                return usuarioEliminado;
            }
        },

        // editarObservacionLider: async(parents, args) => {
        //     const avanceLider = await ModeloAvance.findByIdAndUpdate(args._id {
        //         _id: args.observaciones,
        //         observaciones: args.observaciones
        //     }, { new: true });

        // return avanceLider;

    },
};


export { resolversAvance };