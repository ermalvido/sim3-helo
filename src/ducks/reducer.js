import axios from 'axios';
import { act } from 'react-dom/test-utils';

const initialState = {
    user: {username: "", profile: "", userId: 0}
};

const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";
const GET_USER = "GET_USER";

export function loginUser(user) {
    return {
        type: LOGIN_USER,
        payload: user,
    };
}

export function logoutUser() {
    return {
        type: LOGOUT_USER,
        payload: initialState,
    };
}

export function getUser() {
    const user = axios.get('/auth/user');

    return {
        type: GET_USER,
        payload: user,
    };
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, user: action.payload};
        case LOGOUT_USER:
            return {...state, ...action.payload};
        case GET_USER + 'PENDING':
            return state;
        case GET_USER + 'FULFILLED':
            return {...state, user: action.payload.data};
        case GET_USER + 'REJECTED':
            return initialState;
        default:
            return initialState;
    }
}