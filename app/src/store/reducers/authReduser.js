import actionTypes from "../actions/actionType"
import * as t from '../actions/index'
const initiaState = {
    userInfor: [],
    // emai: '',
    isloading: false
}

const authReducer = (state = initiaState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            console.log("SAVE DATA SUCCESS", action)
            return {
                ...state,
                userInfor: action.userInfor,
                isloading: true,
                // emai: action.emai
            }
        case actionTypes.LOGIN_FAILED:
            return {
                ...state,
            }

        case actionTypes.LOGOUT:
            return {
                ...state,
                userInfor: null,
                isloading: false,
            }

        default:
            return state
    }

}
export default authReducer
