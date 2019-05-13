import { pointActionTypes } from  '../constants/point-action-types'

const initalState = {
    1: {
        id: 1,
        coordinates: [-41.28, 174.69],
        name: 'first point'
    },
    2: {
        id: 2,
        coordinates: [-41.24, 174.74],
        name: 'second point'
    },
    3: {
        id: 3,
        coordinates: [-41.30, 174.78],
        name: 'third point'
    },

}

function changePointsOrder(state, oldIndex, newIndex) {
    const pointArray = Object.values(state)
    pointArray.sort((a, b) => a.order - b.order)
    const element = pointArray[oldIndex]
    pointArray.splice(oldIndex, 1)
    pointArray.splice(newIndex, 0, element)
    const newState = {}
    pointArray.forEach((value, index) => 
        newState[value.id] = {...value, order: index}
    )
    console.log(newState)
    return newState
}

export function pointsReducer(state = initalState, action) {
    switch (action.type) {
        case pointActionTypes.CHANGE_ORDER: 
            const { newIndex, oldIndex } = action.payload
            return changePointsOrder(state, oldIndex, newIndex)
        default: 
            return state    
    }
}