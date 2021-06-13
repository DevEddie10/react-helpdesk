import { useReducer } from 'react'
import moduloContext from '../../context/modulos/moduloContext'
import moduloReducer from '../../context/modulos/moduloReducer'
import clienteAxios from '../../config/axios'
import swal from 'sweetalert'
import {
    GET_MODULES,
    ADD_MODULE,
    UPDATE_MODULE,
    DELETE_MODULE
} from '../../types'

const moduloState = ({ children }) => {
    const initialState = {
        modules: []
    }

    const [state, dispatch] = useReducer(moduloReducer, initialState)

    const getModules = async () => {
        try {
            const response = await clienteAxios.get('/modulos')

            dispatch({
                type: GET_MODULES,
                payload: response.data.modules
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    const addModule = async data => {
        try {
            const response = await clienteAxios.post('/modulos', data)

            swal('Correcto', `${response.data.message}`, 'success', {
                button: 'Aceptar'
            }).then(() => {
                dispatch({
                    type: ADD_MODULE,
                    payload: response.data.module
                })
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    const updateModule = async (data, dataModule) => {
        try {
            const response = await clienteAxios.put(`/modulos/${dataModule.id}`, data)

            swal('Correcto', `${response.data.message}`, 'success', {
                button: 'Aceptar'
            }).then(() => {
                dispatch({
                    type: UPDATE_MODULE,
                    payload: response.data.module
                })
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    const deleteModule = id => {
        swal({
            title: "¿Estas seguro de eliminar el módulo?",
            text: "Ya no estará disponible en el sistema",
            icon: "warning",
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                const response = await clienteAxios.delete(`/modulos/${id}`)

                swal({
                    title: "Correcto",
                    text: `${response.data.message}`,
                    icon: "success",
                    button: 'Aceptar'
                }).then(() => {
                    dispatch({
                        type: DELETE_MODULE,
                        payload: id
                    })
                })
            } else {
                swal("El módulo sigue activo", {
                    button: 'Aceptar'
                });
            }
        });
    }

    return (
        <moduloContext.Provider
            value={{
                modules: state.modules,
                getModules,
                addModule,
                updateModule,
                deleteModule
            }}
        >
            {children}
        </moduloContext.Provider>
    )
}

export default moduloState