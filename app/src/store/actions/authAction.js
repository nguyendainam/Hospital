import actionTypes from "./actionType"

import { HandleLogin } from '../../service/UserService'

export const userLoginSuccess = (userInfor) => ({
    type: actionTypes.LOGIN_SUCCESS,
    userInfor: userInfor
})

export const userLoginFail = () => ({
    type: actionTypes.LOGIN_FAILED
})


export const fetchDataUser = () => ({
    type: actionTypes.FETCH_DATA_USER
})

export const Logout = () => ({
    type: actionTypes.LOGOUT
})