export const pointsSelector = (state) => state.points
export const pointArraySelector = (state) => Object.values(state.points).sort((a, b) => a.order - b.order)