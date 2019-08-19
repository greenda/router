import React from 'react'
import PropTypes, { number, string, func } from 'prop-types'
import { InfoWindow } from '@react-google-maps/api'

export function PointInfo({ point, onClose }) {
    const { coordinates, name } = point
    return (
        <InfoWindow
            position={coordinates}
            onCloseClick={onClose}
        >
            <div className="point-info-window hidden"
                style={{'fontWeight': 'bold'}}>
                <span>{name}</span>
            </div>
        </InfoWindow>
    )
}

PointInfo.propTypes = {
    point: PropTypes.shape({
        id: number,
        index: number,
        coordinates: PropTypes.shape({
            lat: number,
            lng: number,
        }),
        name: string,
    }),
    onClose: func,
}

export default PointInfo