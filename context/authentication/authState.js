import { useReducer } from 'react'
import authContext from './authContext'
import authReducer from './authReducer'
import {
    LOGIN_AUTENTHICATED,
    USER_AUTHENTICATION,
    GET_NOTIFICATION,
    RELOAD,
    REGISTER_USER,
    LOGOUT
} from '../../types'
import clienteAxios from '../../config/axios'
import authToken from '../../config/authToken'
import jwtDecode from 'jwt-decode'
import swal from 'sweetalert'

const AuthState = ({ children }) => {
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        authenticated: null,
        user: null,
        notifications: [],
        reload: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const login = async data => {
        try {
            const response = await clienteAxios.post('/login', data);

            dispatch({
                type: LOGIN_AUTENTHICATED,
                payload: response.data.token
            })

        } catch (error) {
            console.log(error.response)
        }
    }

    const userAuthentication = async () => {
        const token = localStorage.getItem('token')

        if (token) {
            authToken(token)
        }

        try {
            const response = await clienteAxios.get(`/usuarios/${jwtDecode(token).sub}`)

            dispatch({
                type: USER_AUTHENTICATION,
                payload: response.data
            })
        } catch (error) {
            swal('Atención', `${error.response.data.message}`, {
                icon: 'error',
                button: 'Aceptar'
            }).then(() => {
                dispatch({
                    type: LOGOUT
                })
            })
        }
    }

    const initNotifications = async () => {
        const token = localStorage.getItem('token')

        try {
            const response = await clienteAxios.get(`/notificaciones/${jwtDecode(token).sub}`)

            let count = response.data.notifications

            if (count.length > 0) {
                M.toast({ html: 'Tienes notificaciones en la bandeja', classes: 'rounded' });
            }

        } catch (error) {
            console.log(error.response);
        }
    }

    const getNotifications = async () => {
        const token = localStorage.getItem('token')

        try {
            const response = await clienteAxios.get(`/notificaciones/${jwtDecode(token).sub}`)

            dispatch({
                type: GET_NOTIFICATION,
                payload: response.data.notifications
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    const markAsNotification = async notification => {
        try {
            await clienteAxios.put(`/asnotificacion/${notification.id}`)
        } catch (error) {
            console.log(error.response)
        }
    }

    const markAllAsNotification = async () => {
        const token = localStorage.getItem('token')

        try {
            const response = await clienteAxios.put(`/allnotificacion/${jwtDecode(token).sub}`)

            dispatch({
                type: GET_NOTIFICATION,
                payload: response.data.notifications
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    const addUser = async data => {
        try {
            const response = await clienteAxios.post('/usuarios', data)

            swal('Correcto', `${response.data.message}`, {
                icon: 'success',
                button: 'Aceptar'
            }).then(() => {
                dispatch({
                    type: REGISTER_USER
                })
            })
        } catch (error) {
            console.log(error.response)
        }

        setTimeout(() => {
            dispatch({
                type: RELOAD
            })
        }, 2000);
    }

    const updateUser = async (data, user) => {
        try {
            const response = await clienteAxios.put(`/usuarios/${user.id}`, data)

            swal('Correcto', `${response.data.message}`, {
                icon: 'success',
                button: 'Aceptar'
            }).then(() => {
                dispatch({
                    type: REGISTER_USER
                })
            })
        } catch (error) {
            console.log(error.response)
        }

        setTimeout(() => {
            dispatch({
                type: RELOAD
            })
        }, 2000);
    }

    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    }

    const deleteUser = async id => {
        swal({
            title: "¿Estas seguro de eliminar el usuario?",
            text: "Ya no estará disponible en el sistema",
            icon: "warning",
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                const response = await clienteAxios.delete(`/usuarios/${id}`)

                swal({
                    title: "Correcto",
                    text: `${response.data.message}`,
                    icon: "success",
                    button: 'Aceptar'
                }).then(() => {
                    dispatch({
                        type: REGISTER_USER
                    })

                    setTimeout(() => {
                        dispatch({
                            type: RELOAD
                        })
                    }, 2000);
                })
            } else {
                swal("El medio sigue activo", {
                    button: 'Aceptar'
                });
            }
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                notifications: state.notifications,
                reload: state.reload,
                login,
                userAuthentication,
                getNotifications,
                initNotifications,
                markAsNotification,
                markAllAsNotification,
                addUser,
                updateUser,
                deleteUser,
                logout
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState