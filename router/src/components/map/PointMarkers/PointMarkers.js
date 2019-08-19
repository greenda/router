import React from "react"
import PropTypes, { number, string, func } from 'prop-types'
import { Marker } from '@react-google-maps/api'

export function PointMarkers({ points, changePointCoordinate, onClick }) {	
    return (
        points.map(point => ( 
			<div key={point.id}>           
				<Marker				
					position={point.coordinates}
					onDragEnd={(event) => {
						changePointCoordinate(point.id, {lat: event.latLng.lat(), lng: event.latLng.lng()})						
					}}
					onClick={() => onClick(point.id)}
					draggable
				/>
			</div>
        ))
    )
}

PointMarkers.propTypes = {
	points: PropTypes.arrayOf(PropTypes.shape({
		id: number,
        index: number,
        coordinates: PropTypes.shape({
            lat: number,
            lng: number,
        }),
        name: string,
	})),
	changePointCoordinate: func,
	onClick: func,
}

export default PointMarkers