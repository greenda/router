import { pointActionTypes } from  '../constants/point-action-types'

export function addPoint(point) {
    return {
        type: pointActionTypes.ADD_POINT,
        payload: {point}
    }
}

export function changePointOrder(oldIndex, newIndex) {
    return {
        type: pointActionTypes.CHANGE_ORDER,
        payload: { oldIndex, newIndex }
    }
}