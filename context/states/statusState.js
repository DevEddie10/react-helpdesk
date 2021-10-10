import { useReducer } from 'react'
import stateContext from './stateContext'
import stateReducer from './stateReducer'
import clienteAxios from '../../config/axios'
import swal from 'sweetalert'
import {
    GET_STATES,
    ADD_CATEGORY,
    UPDATE_STATE,
    DELETE_STATE
} from '../../types'

const statusState = ({ children }) => {
    const initialState = {
        status: []
    }

    const [state, dispatch] = useReducer(stateReducer, initialState)

    const getStates = async () => {
        try {
            const response = await clienteAxios.get('/estados')

            dispatch({
                type: GET_STATES,
                payload: response.data.states
            })
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const addState = async data => {
        try {
            const response = await clienteAxios.post('/estados', data)

            swal({
                title: 'Correcto',
                text: `${response.data.message}`,
                icon: 'success',
                button: 'Aceptar'
            }).then(() => {
                dispatch({
                    type: ADD_CATEGORY,
                    payload: response.data.state
                })
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    const updateState = async (data, dataState) => {
        try {
            const response = await clienteAxios.put(`/estados/${dataState.id}`, data)

            swal({
                title: "Correcto",
                text: `${response.data.message}`,
                icon: 'success',
                button: 'Aceptar'
            }).then(() => {
                dispatch({
                    type: UPDATE_STATE,
                    payload: response.data.state
                })
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    const deleteState = async id => {
        swal({
            title: "¿Estas seguro de eliminar el estado?",
            text: "Ya no estará disponible en el sistema",
            icon: "warning",
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                const response = await clienteAxios.delete(`/estados/${id}`)

                swal({
                    title: "Correcto",
                    text: `${response.data.message}`,
                    icon: "success",
                    button: 'Aceptar'
                }).then(() => {
                    dispatch({
                        type: DELETE_STATE,
                        payload: id
                    })
                })
            } else {
                swal("El estado sigue activo", {
                    button: 'Aceptar'
                });
            }
        })
    }

    return (
        <stateContext.Provider
            value={{
                status: state.status,
                getStates,
                addState,
                updateState,
                deleteState
            }}
        >
            {children}
        </stateContext.Provider>
    )
}

export default statusState
