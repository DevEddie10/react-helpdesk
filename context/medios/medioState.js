import { useReducer } from 'react'
import medioContext from './medioContext'
import medioReducer from './medioReducer'
import clienteAxios from '../../config/axios'
import swal from 'sweetalert'
import {
    GET_MEDIOS,
    ADD_MEDIO,
    UPDATE_MEDIO,
    DELETE_MEDIO
} from '../../types'

const medioState = ({ children }) => {
    const initialState = {
        medios: []
    }

    const [state, dispatch] = useReducer(medioReducer, initialState)

    const getMedios = async () => {
        try {
            const response = await clienteAxios.get('/medio')

            dispatch({
                type: GET_MEDIOS,
                payload: response.data.medios
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    const addMedio = async data => {
        try {
            const response = await clienteAxios.post('/medio', data)

            swal('Correcto', `${response.data.message}`, 'success', {
                button: 'Aceptar'
            }).then(async () => {
                dispatch({
                    type: ADD_MEDIO,
                    payload: response.data.media
                })
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    const updateMedio = async (data, dataMedio) => {
        try {
            const response = await clienteAxios.put(`/medio/${dataMedio.id}`, data)

            swal('Correcto', `${response.data.message}`, 'success', {
                button: 'Aceptar'
            }).then(async () => {
                dispatch({
                    type: UPDATE_MEDIO,
                    payload: response.data.medio
                })
            })

        } catch (error) {
            console.log(error.response)
        }
    }

    const deleteMedio = async id => {
        swal({
            title: "¿Estas seguro de eliminar el medio?",
            text: "Ya no estará disponible en el sistema",
            icon: "warning",
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                const response = await clienteAxios.delete(`/medio/${id}`)

                swal({
                    title: "Correcto",
                    text: `${response.data.message}`,
                    icon: "success",
                    button: 'Aceptar'
                }).then(() => {
                    dispatch({
                        type: DELETE_MEDIO,
                        payload: id
                    })
                })
            } else {
                swal("El medio sigue activo", {
                    button: 'Aceptar'
                });
            }
        })
    }

    return (
        <medioContext.Provider
            value={{
                medios: state.medios,
                getMedios,
                addMedio,
                updateMedio,
                deleteMedio
            }}
        >
            {children}
        </medioContext.Provider>
    )
}

export default medioState