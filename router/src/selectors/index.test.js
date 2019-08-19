import { pointArraySelector } from './index'
import { mockPoints } from '../mock/mock'

describe('Selectors', () => {
    it('pointArraySelector', () => {
        const pointObject = mockPoints.reduce((result, point) => {
            result[point.id] = point
            return result
        }, {})
        expect(pointArraySelector({points: pointObject}).map(point => point.index)).toEqual([0, 1, 2])
    })
})