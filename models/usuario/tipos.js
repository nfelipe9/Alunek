import { gql } from 'apollo-server-express';

const tiposUsuario = gql `
  type Usuario {
    _id: ID!
    nombre: String!
    apellido: String!
    identificacion: String!
    correo: String!
    rol: Enum_Rol!
    estado: Enum_EstadoUsuario
    inscripciones: [Inscripcion]
    avancesCreados: [Avance]
    proyectos:[Proyecto]
    proyectosLiderados: [Proyecto]
    usuariosAvance: [Avance]
  }
  input FiltroUsuarios {
    _id: ID
    identificacion: String
    correo: String
    rol: Enum_Rol
    estado: Enum_EstadoUsuario
  }
  type Query {
    Usuarios: [Usuario]
    usuariosAvance: [Usuario]
    proyectosLiderados:[Usuario]
    Usuario(_id: String!): Usuario
    # Usuario(rol: String!): Usuario
    # Usuario (_id: String, rol: String) : Usuario
  }

  type Mutation {
    crearUsuario(
      nombre: String!
      apellido: String!
      identificacion: String!
      correo: String!
      rol: Enum_Rol!
      estado: Enum_EstadoUsuario
      password: String!
    ): Usuario

    editarUsuario(
      _id: String!
      nombre: String!
      apellido: String!
      identificacion: String!
      correo: String!
      estado: Enum_EstadoUsuario
    ): Usuario

    eliminarUsuario(_id: String, correo: String): Usuario
  }
`;

export { tiposUsuario };