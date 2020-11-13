import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './type.js'

export function loginUser(dataToSubmit){
    //console.log(dataToSubmit);

    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)

    return{
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit){
    //console.log(dataToSubmit);

    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)

    return{
        type: REGISTER_USER,
        payload: request
    }
}

export function auth(){
    //console.log(dataToSubmit);

    const request = axios.post('/api/users/auth')
        .then(response => response.data)

    return{
        type: AUTH_USER,
        payload: request
    }
}