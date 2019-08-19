import { pointActionTypes } from  '../constants/point-action-types'

const initalState = {
    1: {
        id: 1,
        index: 0,
        coordinates: { lat: -41.28, lng: 174.69 },
        name: 'first point'
    },
    2: {
        id: 2,
        index: 1,
        coordinates: { lat: -41.24, lng: 174.74 },
        name: 'second point'
    },
    3: {
        id: 3,
        index: 2,
        coordinates: { lat: -41.30, lng: 174.78 },
        name: 'third point'
    },
}

function changePointsOrder(state, oldIndex, newIndex) {
    const pointArray = Object.values(state)
    const element = pointArray.find(point => point.index === oldIndex)
    pointArray.sort((a, b) => a.index - b.index)    
    pointArray.splice(oldIndex, 1)
    pointArray.splice(newIndex, 0, element)
    return pointArray.reduce((result, point, index) => {
        result[point.id] = { ...point, index }
        return result
    }, {})
}

export function pointsReducer(state = initalState, action) {
    const { payload = {} } = action
    const { pointId, coordinates } = payload
    const newState = { ...state }
    switch (action.type) {
        case pointActionTypes.CHANGE_ORDER: 
            const { newIndex, oldIndex } = payload
            return changePointsOrder(state, oldIndex, newIndex)
        case pointActionTypes.ADD_POINT:
            const newPointId = +new Date().getTime().toString();
            const { name } = payload            
            newState[newPointId] = { name, coordinates, id: newPointId, index: Object.keys(state).length }
            return newState
        case pointActionTypes.REMOVE_POINT:
            const stateBeforeRemove = { ...state }
            delete stateBeforeRemove[pointId]
            return stateBeforeRemove
        case pointActionTypes.CHANGE_COORDINATES:
            const point = {...state[pointId], coordinates}
            delete newState[pointId]
            newState[pointId] = point
            return newState
        default: 
            return state    
    }
}