import {
    GET_SOLUTIONS,
    ADD_SOLUTION,
    UPDATE_SOLUTION,
    DELETE_SOLUTION
} from '../../types'

export default (state, action) => {
    switch (action.type) {
        case GET_SOLUTIONS:
            return {
                ...state,
                solutions: action.payload
            }
        case ADD_SOLUTION:
            return {
                ...state,
                solutions: [...state.solutions, action.payload]
            }
        case UPDATE_SOLUTION:
            return {
                ...state,
                solutions: state.solutions.map(solution => solution.id === action.payload.id
                    ? action.payload
                    : solution
                )
            }
        case DELETE_SOLUTION:
            return {
                ...state,
                solutions: state.solutions.filter(solution => solution.id !== action.payload)
            }
        default:
            return state
    }
}