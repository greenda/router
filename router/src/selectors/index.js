import { createSelector } from 'reselect'

export const pointsSelector = (state) => state.points
export const mapCenterSelector = (state) => state.map.mapCenter

export const pointArraySelector = createSelector(
    pointsSelector,
    points => Object.values(points).sort((a, b) => a.order - b.order)
)