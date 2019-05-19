import { mapActionTypes } from '../constants/map-action-types'

const initalState = {
    mapCenter: [0, 0]
}

export function mapReducer(state = initalState, action) {
    const { payload } = action
    switch (action.type) {
        case mapActionTypes.CHANGE_CENTER: return { mapCenter: payload.mapCenterCoordinates }
        default: return state
    }
}