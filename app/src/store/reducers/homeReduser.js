import * as t from '../actions/index'
import actionTypes from '../actions/actionType'

const initialState = {
    stated: true,
    topDoctors: [],
}

const homeReduser = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DATA_TOP_DOCTOR:
            console.log('fetch data doctor success')
            return {
                ...state,
                topDoctors: action.dataDoctor

            }

        case actionTypes.FETCH_DATA_TOP_DOCTOR_FAILED:
            state.topDoctors = []
            console.log('fetch data doctor failed')
            return {
                ...state
            }

        default:
            return state;
    }
}

export default homeReduser