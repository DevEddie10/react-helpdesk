import {
    GET_TICKETS,
    REGISTER_TICKET,
    RELOADER_DATA,
    ALL_TICKETS,
    ASSIGN_TICKET,
    ASSIGNMENTS_TICKET,
    COMMENTARY_RELOAD
} from '../../types'

export default (state, action) => {
    switch (action.type) {
        case GET_TICKETS:
            return {
                ...state,
                tickets: action.payload
            }
        case REGISTER_TICKET:
        case COMMENTARY_RELOAD:
            return {
                ...state,
                dataReloader: true
            }
        case RELOADER_DATA:
            return {
                ...state,
                dataReloader: false
            }
        case ALL_TICKETS: 
            return {
                ...state,
                alltickets: action.payload
            }
        case ASSIGN_TICKET:
            return {
                ...state,
                alltickets: state.alltickets.filter(ticket => ticket.id !== action.payload.id)
            }
        case ASSIGNMENTS_TICKET: 
            return {
                ...state,
                assignments: action.payload
            }
        default:
            return state
    }
}