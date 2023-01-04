import thunk from 'redux-thunk';
import authReducer from './reducers/authReduser';

import { combineReducers, applyMiddleware } from 'redux';
import { createStore } from 'redux'
import { reducer } from 'redux';
import homeReduser from './reducers/homeReduser';
import appReduser from './reducers/appReduser';

const rootReducer = combineReducers({
    authReducer: authReducer,
    homeReduser: homeReduser,
    appReduser: appReduser

})
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store 