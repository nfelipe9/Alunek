import {gql} from '@apollo/client';

export const AGREGAR_OBSERVACION = gql`

mutation AgregarObservaciones($observaciones: [String]!, $id: String!) {
    agregarObservaciones(observaciones: $observaciones, _id: $id) {
        _id
        observaciones
        descripcion
    }
}
`;

export const CREAR_AVANCE = gql`
    mutation CrearAvance($descripcion: String!, $proyecto: String!, $creadoPor: String!) {
        crearAvance(descripcion: $descripcion, proyecto: $proyecto, creadoPor: $creadoPor) {
            descripcion
        }
    }
`

export const EDITAR_DESCRIPCION = gql`
mutation EditarDescripcion($_id: String!, $descripcion: String!) {
  editarDescripcion(_id: $_id, descripcion: $descripcion) {
    descripcion
    _id
  }
}
`