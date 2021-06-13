import { useReducer } from 'react'
import categoryContext from './categoryContext'
import categoryReducer from './categoryReducer'
import {
    GET_CATEGORIES,
    ADD_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY
} from '../../types'
import clienteAxios from '../../config/axios'
import swal from 'sweetalert'

const categoryState = ({ children }) => {
    const initialState = {
        categories: []
    }

    const [state, dispatch] = useReducer(categoryReducer, initialState)

    const getCategories = async () => {
        try {
            const response = await clienteAxios.get('/categorias');

            dispatch({
                type: GET_CATEGORIES,
                payload: response.data.categories
            })

        } catch (error) {
            console.log(error.response)
        }
    }

    const addCategory = async data => {
        try {
            const response = await clienteAxios.post('/categorias', data)

            swal('Correcto', `${response.data.message}`, {
                icon: 'success',
                button: 'Aceptar'
            }).then(() => {
                dispatch({
                    type: ADD_CATEGORY,
                    payload: response.data.category
                })
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    const updateCategory = async (form, data) => {
        try {
            const response = await clienteAxios.put(`/categorias/${data.id}'`, form)

            swal({
                title: 'Correcto',
                text: `${response.data.message}`,
                icon: 'success',
                button: 'Aceptar'
            }).then(() => {
                dispatch({
                    type: UPDATE_CATEGORY,
                    payload: response.data.category
                })
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    const deleteCategory = async id => {
        swal({
            title: "¿Estas seguro de eliminar la categoría?",
            text: "Ya no estará disponible en el sistema",
            icon: "warning",
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                const response = await clienteAxios.delete(`/categorias/${id}`)

                swal({
                    title: "Correcto",
                    text: `${response.data.message}`,
                    icon: "success",
                    button: 'Aceptar'
                }).then(() => {
                    dispatch({
                        type: DELETE_CATEGORY,
                        payload: id
                    })
                })
            } else {
                swal("La categoría sigue activo", {
                    button: 'Aceptar'
                });
            }
        });
    }

    return (
        <categoryContext.Provider
            value={{
                categories: state.categories,
                getCategories,
                addCategory,
                updateCategory,
                deleteCategory
            }}
        >
            {children}
        </categoryContext.Provider>
    )
}

export default categoryState