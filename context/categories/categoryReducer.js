import { 
    GET_CATEGORIES, 
    ADD_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY 
} from '../../types'

export default (state, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case ADD_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload]
            }
        case UPDATE_CATEGORY:
            return {
                ...state,
                categories: state.categories.map(category => category.id === action.payload.id
                    ? action.payload
                    : category
                )
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(category => category.id !== action.payload)
            }
        default:
            return state;
    }
}