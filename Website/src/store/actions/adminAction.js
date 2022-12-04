import actionTypes from './actionTypes';
import {
    getAllCodeService, getAllUsers, getTopDoctorHome,
    createNewUserService, deleUserService, editUserService
} from '../../services/userService';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })

            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFaided())
            }
        } catch (error) {
            dispatch(fetchGenderFaided())
            console.log(" fetchGenderStart from Redux", error)
        }
    }

}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})


export const fetchGenderFaided = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})



// =============================== POSITION ===================================

export const fetchPositonStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_POSITION_SUCCESS
            })

            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositonSuccess(res.data))
            } else {
                dispatch(fetchPositionFaided())
            }
        } catch (error) {
            dispatch(fetchPositionFaided())
            console.log(" fetchGenderStart from Redux", error)
        }
    }

}


export const fetchPositonSuccess = (PositionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: PositionData
})


export const fetchPositionFaided = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

// =============================== ROLE ===================================

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_ROLE_SUCCESS
            })

            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchPositionFaided())
            }
        } catch (error) {
            dispatch(fetchRoleFaided())
            console.log(" fetchGenderStart from Redux", error)
        }
    }

}


export const fetchRoleSuccess = (RoleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: RoleData
})


export const fetchRoleFaided = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})


export const createNewUser = (data) => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.CREATE_USER_SUCCESS
            })

            let res = await createNewUserService(data);
            console.log('create new user from admin action ', res)
            if (res && res.errCode === 0) {
                dispatch(fetchSaveUserSuccess())

            } else {
                dispatch(fetchSaveUserFailed())
            }
        } catch (error) {
            dispatch(fetchSaveUserFailed())
            console.log(" fetchGenderStart from Redux", error)
        }
    }

}

export const fetchSaveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const fetchSaveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILDED
})


export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {


            dispatch({
                type: actionTypes.FETCH_ALL_USERS_SUCCESS
            })

            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUserFailed())
            }
        } catch (error) {
            dispatch(fetchAllUserFailed())
            console.log(" fetchGenderStart from Redux", error)
        }
    }

}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED

})


export const deleteAUser = (userId) => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.DELETE_USER_SUCCESS
            })


            let res = await deleUserService(userId);
            console.log('create new user from admin action ', res)
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserStart())

            } else {
                dispatch(deleteUserFailed())
            }
        } catch (error) {
            dispatch(deleteUserFailed())
            console.log(" fetchGenderStart from Redux", error)
        }
    }

}


export const deleteUserSucces = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})


export const editAUser = (data) => {

    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                dispatch(updateUserFailed())
            }
        } catch (error) {
            dispatch(updateUserFailed())
            console.log(" fetchGenderStart from Redux", error)
        }
    }

}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const updateUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHome('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
            }

        } catch (error) {
            console.log("Fetch data failed from adminaction")
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED
            })
        }
    }
}

// let res1 =  await getTopDoctorHome('')

