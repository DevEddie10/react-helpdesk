import {
    GET_STATES,
    ADD_CATEGORY,
    UPDATE_STATE,
    DELETE_STATE
} from '../../types'

export default (state, action) => {
    switch (action.type) {
        case GET_STATES:
            return {
                ...state,
                status: action.payload
            }
        case ADD_CATEGORY:
            return {
                ...state,
                status: [...state.status, action.payload]
            }
        case UPDATE_STATE:
            return {
                ...state,
                status: state.status.map(state => state.id === action.payload.id
                    ? action.payload
                    : state
                )
            } 
        case DELETE_STATE:
            return {
                ...state,
                status: state.status.filter(state => state.id !== action.payload)
            }
        default:
            return state
    }
}