import { pointActionTypes } from  '../constants/point-action-types'
import { mapActionTypes } from '../constants/map-action-types'
import { 
    addPoint, 
    removePoint,
    changePointOrder,
    changeMapCenter,
    changePointCoordinate,
} from './actions'
import {
    MOCK_POINT_ID,
    MOCK_POINT_NAME,
    MOCK_COORDINATES,
    MOCK_OLD_INDEX,
    MOCK_NEW_INDEX,
} from '../mock/mock'

describe('Actions', () => {
    it('addPoint', () => {
        const action = addPoint(MOCK_POINT_NAME, MOCK_COORDINATES)
        expect(action.type).toEqual(pointActionTypes.ADD_POINT)
        expect(action.payload.name).toEqual(MOCK_POINT_NAME)
        expect(action.payload.coordinates).toEqual(MOCK_COORDINATES)
    })

    it('removePoint', () => {
        const action = removePoint(MOCK_POINT_ID)
        expect(action.type).toEqual(pointActionTypes.REMOVE_POINT)
        expect(action.payload.pointId).toEqual(1)
    })

    it('changePointOrder', () => {
        const action = changePointOrder(MOCK_OLD_INDEX, MOCK_NEW_INDEX)
        expect(action.type).toEqual(pointActionTypes.CHANGE_ORDER)
        expect(action.payload.oldIndex).toEqual(MOCK_OLD_INDEX)
        expect(action.payload.newIndex).toEqual(MOCK_NEW_INDEX)
    })

    it('changeMapCenter', () => {
        const action = changeMapCenter(MOCK_COORDINATES)
        expect(action.type).toEqual(mapActionTypes.CHANGE_CENTER)
        expect(action.payload.mapCenterCoordinates).toEqual(MOCK_COORDINATES)
    })

    it('changePointCoordinate', () => {
        const action = changePointCoordinate(MOCK_POINT_ID, MOCK_COORDINATES)
        expect(action.type).toEqual(pointActionTypes.CHANGE_COORDINATES)
        expect(action.payload.pointId).toEqual(MOCK_POINT_ID)
        expect(action.payload.coordinates).toEqual(MOCK_COORDINATES)
    })
})
