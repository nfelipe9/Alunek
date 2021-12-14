import { gql } from '@apollo/client';

const CREAR_INSCRIPCION = gql`
  mutation Mutation($proyecto: String!, $estudiante: String!) {
    crearInscripcion(proyecto: $proyecto, estudiante: $estudiante) {
      _id
    }
  }
`;

const APROBAR_INSCRIPCION = gql`
  mutation AprobarInscripcion($aprobarInscripcionId: String!) {
    aprobarInscripcion(id: $aprobarInscripcionId) {
      _id
    }
  }
`;

export const RECHAZAR_INSCRIPCION = gql`

  mutation RechazarInscripcion($_id: String!) {
    rechazarInscripcion(id: $_id) {
      _id
      estado
    }
  }
`;

export { CREAR_INSCRIPCION, APROBAR_INSCRIPCION };
