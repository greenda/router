import { combineReducers } from 'redux'
import { pointsReducer } from './points.js'
import { mapReducer } from './map.js'

export const rootReducer = combineReducers({
    points: pointsReducer,
    map: mapReducer,
});