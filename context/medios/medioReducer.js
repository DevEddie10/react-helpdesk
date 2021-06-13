import {
    GET_MEDIOS,
    ADD_MEDIO,
    UPDATE_MEDIO,
    DELETE_MEDIO
} from '../../types'

export default (state, action) => {
    switch (action.type) {
        case GET_MEDIOS:
            return {
                ...state,
                medios: action.payload
            }
        case ADD_MEDIO:
            return {
                ...state,
                medios: [...state.medios, action.payload]
            }
        case UPDATE_MEDIO:
            return {
                ...state,
                medios: state.medios.map(medio => medio.id === action.payload.id
                    ? action.payload
                    : medio
                )
            }
        case DELETE_MEDIO:
            return {
                ...state,
                medios: state.medios.filter(medio => medio.id !== action.payload)
            }
        default:
            return state
    }
}