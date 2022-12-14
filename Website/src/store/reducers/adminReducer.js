import actionTypes from '../actions/actionTypes';
const initialState = {
    isloadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let coppySate = { ...state }
            coppySate.isloadingGender = true

            return {
                ...coppySate
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            state.isloadingGender = false
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isloadingGender = false
            state.genders = []
            return {
                ...state
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = []
            return {
                ...state
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data
            return {
                ...state
            }

        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = []
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = []
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.dataDoctors
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.topDoctors = []
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.allDoctors
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.allDoctors = []
            return {
                ...state
            }

        case actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS:
            return {
                ...state
            }

        case actionTypes.SAVE_DETAIL_DOCTOR_FAILED:
            return {
                ...state
            }


        case actionTypes.FETCH_ALL_CODE_SCHEDULE_SUCCESS:
            state.allScheduleTime = action.dataTime
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_CODE_SCHEDULE_FAILED: {
            state.allScheduleTime = []
            return {
                ...state
            }
        }








        default:
            return state;
    }
}

export default adminReducer;