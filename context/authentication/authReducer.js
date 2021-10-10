import {
    LOGIN_AUTENTHICATED,
    USER_AUTHENTICATION,
    GET_NOTIFICATION,
    RELOAD,
    REGISTER_USER,
    AUTH_UPDATE_USER,
    LOGOUT
} from '../../types'
import router from 'next/router'

export default (state, action) => {
    switch (action.type) {
        case LOGIN_AUTENTHICATED:
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                token: action.payload,
                authenticated: true
            }
        case USER_AUTHENTICATION:
            return {
                ...state,
                authenticated: true,
                user: action.payload
            }
        case GET_NOTIFICATION:
            return {
                ...state,
                notifications: action.payload
            }
        case REGISTER_USER:
            return {
                ...state,
                reload: true
            }
        case RELOAD:
            return {
                ...state,
                reload: false
            }
        case LOGOUT:
            localStorage.removeItem('token')
            router.push('/login')
            return {
                ...state,
                token: null,
                authenticated: null,
                user: null
            }
        case AUTH_UPDATE_USER:
            return {
                ...state,
                reload: true
            }
        default:
            return state;
    }
}