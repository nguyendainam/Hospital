
import actionTypes from "../actions/actionType"
import * as t from '../actions/index'
const initiaState = {
    language: 'vi',
    loadingAPP: true
}


const appReduser = (state = initiaState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_LANGUAGE:
            console.log('Ngon ngu cho app  ', action)
            return {
                ...state,
                language: action.language
            }

        default:
            return state;
    }
}

export default appReduser