import axios from 'axios';
import {
    LOGIN_USER
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