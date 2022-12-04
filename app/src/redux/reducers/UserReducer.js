
import actionTypes from '../actions/typesActions';
const initialState = {
    isLoggedIn: false,
    userInfo: null
}
// const initialSate = {
//     email: "",
//     FirstName: "",
//     LastName: "",
//     Address: "",
//     PhoneNumber: "",
// }

export default function actionForReducer(state = initialSate, action) {
    switch (action.type) {
        case actionTypes.ADD_USER_SUCCESS: {
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo

            }
        }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        default:
            return state;
    }
}
