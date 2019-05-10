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

export function pointsReducer(state = initalState) {
    return state
}