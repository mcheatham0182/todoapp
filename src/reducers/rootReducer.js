import { combineReducers } from 'redux'
import tasksReducer from './tasksReducer'
import activeTaskReducer from './activeTaskReducer'

const rootReducer = combineReducers({
    tasksReducer,
    activeTaskReducer

});

export default rootReducer
