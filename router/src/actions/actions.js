import { pointActionTypes } from  '../constants/point-action-types'
import { mapActionTypes } from '../constants/map-action-types'

export function addPoint(name, coordinates) {
    return {
        type: pointActionTypes.ADD_POINT,
        payload: { name, coordinates }
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

export function changeMapCenter(mapCenterCoordinates) {
    return {
        type: mapActionTypes.CHANGE_CENTER,
        payload: { mapCenterCoordinates }
    }
}

export function changePointCoordinate(pointId, coordinates) {
    return {
        type: pointActionTypes.CHANGE_COORDINATES,
        payload: { pointId, coordinates }
    }
}