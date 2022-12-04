import { combineReducers } from "redux";
import { useReducer } from "./UserReducer";


const reducers = combineReducers({
    customerInfor: useReducer
})


export default (state, action) => reducers(state, action)