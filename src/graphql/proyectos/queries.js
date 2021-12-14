import {
  gql
} from '@apollo/client';

const PROYECTOS = gql `
  query Proyectos {
    Proyectos {
      _id
      nombre
      estado
      fase
      objetivos {
        descripcion
        tipo
      }
      lider {
        _id
        correo
        nombre
        apellido
      }
      inscripciones {
        estado
        estudiante {
          _id
        }
      }
    }
  }
`;

const GET_PROYECTO = gql `

query Proyecto($_id: String!) {
  Proyecto(_id: $_id) {
    _id
    nombre
    fase
    presupuesto
    estado
    objetivos {
      descripcion
      tipo
    }
  }
}

`

const GET_AVANCES_PROYECTO = gql `

query Proyecto($_id: String!) {
  Proyecto(_id: $_id) {
    _id
    nombre
    avances {
      _id
      descripcion
      fecha
      observaciones
      creadoPor {
        _id
        nombre
        apellido
      }
    }
  }
}

`
export {
  PROYECTOS,
  GET_PROYECTO,
  GET_AVANCES_PROYECTO
};