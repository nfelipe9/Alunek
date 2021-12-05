import { UserModel } from './usuario.js';
import bcrypt from 'bcrypt';

const resolversUsuario = {
    Usuario: {
        inscripciones: async(parent, args, context) => {
            return InscriptionModel.find({ estudiante: parent._id });
        },
    },
    Query: {
        Usuarios: async(parent, args, context) => {
            const usuarios = await UserModel.find().populate([{
                    path: 'inscripciones',
                    populate: {
                        path: 'proyecto',
                        populate: [{ path: 'lider' }, { path: 'avances' }],
                    },
                },
                {
                    path: 'proyectosLiderados',
                },
            ]);
            return usuarios;
        },

        usuariosAvance: async(parent, args) => {
            console.log('parent usuario', parent);
            const usuariosAvance = await UserModel.find().populate('avances');
            return usuariosAvance;
        },

        proyectosLiderados: async(parent, args) => {
            const proyectosLiderados = await UserModel.find().populate('ProyectosLiderados');
            return proyectosLiderados;
        },

        Usuario: async(parent, args) => {
            const usuario = await UserModel.findOne({ _id: args._id }).populate([{
                    path: 'inscripciones',
                    populate: {
                        path: 'proyecto',
                        populate: [{ path: 'lider' }, { path: 'avances' }],
                    },
                },
                {
                    path: 'proyectosLiderados',
                },
            ]).exec();
            return usuario;
        },
    },
    Mutation: {
        crearUsuario: async(parent, args) => {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(args.password, salt);
            const usuarioCreado = await UserModel.create({
                nombre: args.nombre,
                apellido: args.apellido,
                identificacion: args.identificacion,
                correo: args.correo,
                rol: args.rol,
                password: hashedPassword,
            });

            if (Object.keys(args).includes('estado')) {
                usuarioCreado.estado = args.estado;
            }

            return usuarioCreado;
        },
        editarUsuario: async(parent, args) => {
            const usuarioEditado = await UserModel.findByIdAndUpdate(
                args._id, {
                    nombre: args.nombre,
                    apellido: args.apellido,
                    identificacion: args.identificacion,
                    correo: args.correo,
                    estado: args.estado,
                }, { new: true }
            );

            return usuarioEditado;
        },
        eliminarUsuario: async(parent, args) => {
            if (Object.keys(args).includes('_id')) {
                const usuarioEliminado = await UserModel.findOneAndDelete({ _id: args._id });
                return usuarioEliminado;
            } else if (Object.keys(args).includes('correo')) {
                const usuarioEliminado = await UserModel.findOneAndDelete({ correo: args.correo });
                return usuarioEliminado;
            }
        },
    },
};

export { resolversUsuario };