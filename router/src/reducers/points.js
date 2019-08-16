import { pointActionTypes } from  '../constants/point-action-types'

const initalState = {
    1: {
        id: 1,
        index: 0,
        coordinates: [-41.28, 174.69],
        name: 'first point'
    },
    2: {
        id: 2,
        index: 1,
        coordinates: [-41.24, 174.74],
        name: 'second point'
    },
    3: {
        id: 3,
        index: 2,
        coordinates: [-41.30, 174.78],
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
    switch (action.type) {
        case pointActionTypes.CHANGE_ORDER: 
            const { newIndex, oldIndex } = action.payload
            return changePointsOrder(state, oldIndex, newIndex)
        case pointActionTypes.ADD_POINT:
            const newPointId = new Date().getTime().toString();
            // TODO через inmuttable
            const { name, coordinates } = action.payload
            const newState = { ...state }
            newState[newPointId] = { name, coordinates, id: newPointId, index: Object.keys(state).length }
            return newState
        case pointActionTypes.REMOVE_POINT:
            const { pointId } = action.payload
            // TODO через inmuttable
            const stateBeforeRemove = { ...state }
            delete stateBeforeRemove[pointId]
            return stateBeforeRemove
        default: 
            return state    
    }
}