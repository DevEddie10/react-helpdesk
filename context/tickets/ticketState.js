import { useReducer } from 'react'
import ticketContext from './ticketContext'
import ticketReducer from './ticketReducer'
import clienteAxios from '../../config/axios'
import jwtDecode from 'jwt-decode'
import swal from 'sweetalert'
import {
    GET_TICKETS,
    REGISTER_TICKET,
    RELOADER_DATA,
    ALL_TICKETS,
    ASSIGN_TICKET,
    ASSIGNMENTS_TICKET,
    COMMENTARY_RELOAD
} from '../../types'

const ticketState = ({ children }) => {
    const initialState = {
        tickets: [],
        alltickets: [],
        assignments: [],
        dataReloader: null
    }
    const [state, dispatch] = useReducer(ticketReducer, initialState)

    const getUserTickets = async () => {
        const token = localStorage.getItem('token')

        try {
            const response = await clienteAxios.get(`/tickets/${jwtDecode(token).sub}`)

            dispatch({
                type: GET_TICKETS,
                payload: response.data.assigned
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    const registerTicket = async data => {
        const token = localStorage.getItem('token')
        data.user_id = jwtDecode(token).sub

        try {
            const response = await clienteAxios.post('/tickets', data)

            swal('Correcto', `${response.data.message}`, 'success', {
                button: 'Aceptar'
            }).then(() => {
                dispatch({
                    type: REGISTER_TICKET,
                })
            })

        } catch (error) {
            console.log(error.response)
        }

        setTimeout(() => {
            dispatch({
                type: RELOADER_DATA
            })
        }, 2000);
    }

    const getAllTickets = async () => {
        try {
            const response = await clienteAxios.get('/tickets')

            dispatch({
                type: ALL_TICKETS,
                payload: response.data.tickets
            })
        } catch (error) {
            console.log(error.response.message);
        }
    }

    const AssignTicket = async (data, id) => {
        try {
            const response = await clienteAxios.put(`/tickets/${id}`, data)

            swal('Correcto', `${response.data.message}`, 'success', {
                button: 'Aceptar'
            }).then(() => {
                dispatch({
                    type: ASSIGN_TICKET,
                    payload: response.data.ticket
                })
            })
        } catch (error) {
            console.log(error);
        }
    }

    const assignmentsTickets = async () => {
        try {
            const response = await clienteAxios.get('/asignaciones')

            dispatch({
                type: ASSIGNMENTS_TICKET,
                payload: response.data.tickets
            })
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const trackingTicket = async id => {
        try {
            const response = await clienteAxios.get(`/asignaciones/${id}`)
            return response.data.ticket
        } catch (error) {
            console.log(error.response);
        }
    }

    const addCommentary = async (data, dataTicket) => {
        try {
            data.assgment_id = dataTicket.id
            data.assigned_id = dataTicket.assigned_id

            const response = await clienteAxios.post('/asignaciones', data)

            swal('Correcto', `${response.data.message}`, 'success', {
                button: 'Aceptar'
            }).then(() => {
                dispatch({
                    type: COMMENTARY_RELOAD
                })
                return response.data.commentary
            })
        } catch (error) {
            console.log(error.response);
        }

        setTimeout(() => {
            dispatch({
                type: RELOADER_DATA
            })
        }, 2000);
    }

    const addCloseTicket = async (data, dataTicket) => {
        try {
            const response = await clienteAxios.put(`/asignaciones/${dataTicket.id}`, data)
            swal('Correcto', `${response.data.message}`, 'success', {
                button: 'Aceptar'
            }).then(() => {
              return response.data.ticket  
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const reasignTicket = async (data, dataTicket) => {
        try {
            const response = await clienteAxios.put(`/reasignar/${dataTicket.id}`, data)
            swal('Correcto', `${response.data.message}`, 'success', {
                button: 'Aceptar'
            }).then(() => {
                return response.data.commentary
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const reactivateTicket = async (data, ticket) => {
        try {
            const response = await clienteAxios.put(`/reactivar/${ticket.id}`, data)

            swal('Correcto', `${response.data.message}`, 'success', {
                button: 'Aceptar'
            }).then(() => {
                return response.data.ticket
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const finishedTicket = async (data, ticket) => {
        try {
            const response = await clienteAxios.put(`/finalizado/${ticket.id}`, data)

            swal('Correcto', `${response.data.message}`, 'success', {
                button: 'Aceptar'
            }).then(() => {
                return response.data.ticket
            })
        } catch (error) {
            console.log(error.response.message);
        }
    }

    return (
        <ticketContext.Provider
            value={{
                tickets: state.tickets,
                alltickets: state.alltickets,
                assignments: state.assignments,
                dataReloader: state.dataReloader,
                getUserTickets,
                registerTicket,
                getAllTickets,
                AssignTicket,
                assignmentsTickets,
                trackingTicket,
                addCommentary,
                addCloseTicket,
                reasignTicket,
                reactivateTicket,
                finishedTicket
            }}
        >
            {children}
        </ticketContext.Provider>
    )
}

export default ticketState