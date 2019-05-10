import { combineReducers } from 'redux'
import { pointsReducer } from './points.js'

export const rootReducer = combineReducers({
    points: pointsReducer,
});