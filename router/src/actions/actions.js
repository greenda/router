import { pointActionTypes } from  '../constants/point-action-types'

export function addPoint(name, coordinate) {
    return {
        type: pointActionTypes.ADD_POINT,
        payload: { name, coordinate }
    }
}

export function removePoint(pointId) {
    return {
        type: pointActionTypes.REMOVE_POINT,
        payload: { pointId }
    }
}

export function changePointOrder(oldIndex, newIndex) {
    return {
        type: pointActionTypes.CHANGE_ORDER,
        payload: { oldIndex, newIndex }
    }
}