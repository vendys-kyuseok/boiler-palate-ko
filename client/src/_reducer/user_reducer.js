import {
    LOGIN_USER
} from '../_actions/type.js';

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.paload}
            break;
             
        default:
            return state;
    }
}