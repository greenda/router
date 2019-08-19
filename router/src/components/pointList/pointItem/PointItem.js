import React from 'react'
import PropTypes, { number, string } from 'prop-types'
import './PointItem.scss'

export function PointItem({ point, removePoint}) {
    const { name, id } = point
    
    return (
        <div className="point-item">
            <div data-testid="task-content" className="point-item__name">{name}</div>
		    <div className="point-item__remove-icon" onClick={() => removePoint(id)}>x</div>
        </div>          
    )
}

PointItem.propTypes = {
    point: PropTypes.shape({
        id: number,
        index: number,
        coordinates: PropTypes.shape({
            lat: number,
            lng: number,
        }),
        name: string,
    })
}

export default PointItem