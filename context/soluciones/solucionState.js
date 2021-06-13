import { useReducer } from 'react'
import solucionContext from '../../context/soluciones/solucionContext'
import solucionReducer from '../../context/soluciones/solucionReducer'
import clienteAxios from '../../config/axios'
import swal from 'sweetalert'
import {
    GET_SOLUTIONS,
    ADD_SOLUTION,
    UPDATE_SOLUTION,
    DELETE_SOLUTION
} from '../../types'

const solucionState = ({ children }) => {
    const initialState = {
        solutions: []
    }

    const [state, dispatch] = useReducer(solucionReducer, initialState)

    const getSolutions = async () => {
        try {
            const response = await clienteAxios.get('/soluciones')

            dispatch({
                type: GET_SOLUTIONS,
                payload: response.data.solutions
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    const addSolution = async data => {
        try {
            const response = await clienteAxios.post('/soluciones', data)

            swal('Correcto', `${response.data.message}`, 'success', {
                button: 'Aceptar'
            }).then(() => {
                dispatch({
                    type: ADD_SOLUTION,
                    payload: response.data.solucion
                })
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    const updateSolution = async (data, dataSolution) => {
        try {
            const response = await clienteAxios.put(`/soluciones/${dataSolution.id}`, data)

            swal('Correcto', `${response.data.message}`, 'success', {
                button: 'Aceptar'
            }).then(() => {
                dispatch({
                    type: UPDATE_SOLUTION,
                    payload: response.data.solucion
                })
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    const deleteSolution = id => {
        swal({
            title: "¿Estas seguro de eliminar la solución?",
            text: "Ya no estará disponible en el sistema",
            icon: "warning",
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                const response = await clienteAxios.delete(`/soluciones/${id}`)

                swal({
                    title: "Correcto",
                    text: `${response.data.message}`,
                    icon: "success",
                    button: 'Aceptar'
                }).then(() => {
                    dispatch({
                        type: DELETE_SOLUTION,
                        payload: id
                    })
                })
            } else {
                swal("La solución sigue activo", {
                    button: 'Aceptar'
                });
            }
        });
    }

    return (
        <solucionContext.Provider
            value={{
                solutions: state.solutions,
                getSolutions,
                addSolution,
                updateSolution,
                deleteSolution
            }}
        >
            {children}
        </solucionContext.Provider>
    )
}

export default solucionState