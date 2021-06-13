import {
    GET_MODULES,
    ADD_MODULE,
    UPDATE_MODULE,
    DELETE_MODULE
} from '../../types'

export default (state, action) => {
    switch (action.type) {
        case GET_MODULES:
            return {
                ...state,
                modules: action.payload
            }
        case ADD_MODULE:
            return {
                ...state,
                modules: [...state.modules, action.payload]
            }
        case UPDATE_MODULE:
            return {
                ...state,
                modules: state.modules.map(module => module.id === action.payload.id
                    ? action.payload
                    : module
                )
            }
        case DELETE_MODULE:
            return {
                ...state,
                modules: state.modules.filter(module => module.id !== action.payload)
            }
        default:
            return state
    }
}