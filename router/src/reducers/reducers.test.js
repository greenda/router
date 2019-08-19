import { pointsReducer } from './points.js'
import { mapReducer } from './map.js'
import { 
    addPoint, 
    removePoint,
    changePointOrder,
    changeMapCenter,
    changePointCoordinate,
} from '../actions/actions'
import { 
    MOCK_POINT_ID,
    MOCK_POINT_NAME,
    MOCK_COORDINATES,
    MOCK_POINTS_STATE,
    MOCK_MAP_STATE,
} from '../mock/mock'

describe('Reducers: pointReducer', () => {
    it('change point order', () => {
        const action = changePointOrder(2, 0)
        const newState = pointsReducer({ ...MOCK_POINTS_STATE }, action)
        const pointsIndexes = 
            Object.values(newState)
                .sort((a, b) => (a.index > b.index) ? 1 : -1)
                .map(point => point.id)
        expect(pointsIndexes).toEqual([3, 1, 2])
    })

    it('add point', () => {
        const action = addPoint(MOCK_POINT_NAME, MOCK_COORDINATES)
        const newState = pointsReducer({ ...MOCK_POINTS_STATE }, action)
        const newPointId = Math.max(...Object.keys(newState))

        expect(Object.keys(newState).length).toEqual(4)
        expect(newState[newPointId].name).toEqual(MOCK_POINT_NAME)
        expect(newState[newPointId].coordinates).toEqual(MOCK_COORDINATES)
    })

    it('remove point', () => {
        const action = removePoint(MOCK_POINT_ID)
        const newState = pointsReducer({ ...MOCK_POINTS_STATE }, action)

        expect(Object.keys(newState).length).toEqual(2)
        expect(newState[MOCK_POINT_ID]).toBeUndefined()
    })

    it('change point coordinates', () => {
        const action = changePointCoordinate(MOCK_POINT_ID, MOCK_COORDINATES)
        const newState = pointsReducer({ ...MOCK_POINTS_STATE }, action)

        expect(newState[MOCK_POINT_ID].coordinates).toEqual(MOCK_COORDINATES)
    })
})

describe('Reducers: mapReducer', () => {
    it('change map center coordinates', () => {
        const action = changeMapCenter(MOCK_COORDINATES)
        const newState = mapReducer({ ...MOCK_MAP_STATE }, action)

        expect(newState.mapCenter).toEqual(MOCK_COORDINATES)
    })
})