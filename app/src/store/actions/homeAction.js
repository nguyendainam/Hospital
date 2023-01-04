import actionTypes from "./actionType";
import HomeService, { getTopDoctorHome } from '../../service/HomeService'

export const changLanguageApp = (language) => ({
    type: actionTypes.CHANGE_LANGUAGE,
    language: language
})




export const fetchTopDoctor = (dataDoctor) => {
    return async (dispatch, getState) => {
        try {
            dispatch({

                type: actionTypes.FETCH_DATA_TOP_DOCTOR,
                dataDoctor: dataDoctor
            })
            console.log("Fetch Top doctor action success")


        } catch (e) {
            console.log('ERROR FROM FETCH TOP DOCTOR', e)
            dispatch({
                type: actionTypes.FETCH_DATA_TOP_DOCTOR_FAILED
            })
        }
    }
}