import React from 'react'
import { connect } from 'react-redux'
import PropTypes, { number, string, func } from 'prop-types'
import { pointArraySelector } from '../../selectors/index'
import { changePointOrder, removePoint } from '../../actions/actions'
import PointListView from './PointListView'

export function PointListContainer({ points, changePointOrder, removePoint }) {
    const onDragEnd = (result) => {
        if (!result.destination) {
            return
        }
    
        const itemIndex = result.source.index
        const destinationIndex = result.destination.index
        changePointOrder(itemIndex, destinationIndex)
    }

    return (
        <PointListView 
            points={points}
            removePoint={removePoint}
            onDragEnd={onDragEnd}/>
    )
}

PointListView.propTypes = {
	points: PropTypes.arrayOf(PropTypes.shape({
		id: number,
        index: number,
        coordinates: PropTypes.shape({
            lat: number,
            lng: number,
        }),
        name: string,
    })),
	changePointOrder: func,
	removePoint: func,
}

export default connect(
	(state) => ({
		points: pointArraySelector(state)
	}),
	{ changePointOrder, removePoint }
)(PointListContainer)