import { gql } from 'apollo-server-express';

const tiposAvance = gql `
  type Avance {
    _id: ID!
    fecha: Date!
    descripcion: String!
    observaciones: [String]
    proyecto: Proyecto!
    creadoPor: Usuario!
  }

  type Query {
    Avances: [Avance]
    filtrarAvance(_id: String!): [Avance]
  }
  type Mutation {
    crearAvance(fecha: Date! descripcion: String! proyecto: String! creadoPor: String!): Avance
    editarAvance(_id: String! fecha: Date! proyecto: String! descripcion: String! creadoPor: String!): Avance
    editarAvanceEstudiante(_id:String! descripcion:String!): Avance
    eliminarAvance(_id:String! descripcion:String!): Avance
    # editarObservacionLider(_id: String!, observaciones: String): Avance
  }
`;

export { tiposAvance };