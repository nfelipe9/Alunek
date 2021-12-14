import { gql } from '@apollo/client';

const GET_INSCRIPCIONES = gql`
  query Inscripciones {
    Inscripciones {
      _id
      estado
      estudiante {
        _id
        nombre
        apellido
        correo
      }
      proyecto {
        _id
        nombre
        lider {
          _id
        }
      }
    }
  }
`;

const GET_PROYECTOS_ESTUDIANTE = gql`
query InscripcionesEstudiante($_id: String!) {
  inscripcionesEstudiante(_id: $_id) {
    estado
    fechaEgreso
    proyecto {
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
    }
  }
}
`;

export { GET_INSCRIPCIONES, GET_PROYECTOS_ESTUDIANTE };
