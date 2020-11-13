import { combineReducers } from "redux";
import user from './user_reducer';


// store에 reducer가 여러 개 일수있다. => 그래서 root reducer에서 하나로 합친다.

const rootReucer = combineReducers({ 
    user
});

export default rootReucer;