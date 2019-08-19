import React from "react"
import { Polyline } from '@react-google-maps/api'

export function Route({ points }) {
    const path = points.reduce((result, point) => {
        result.push(point.coordinates)
        return result
    }, [])

    return (
        <Polyline
            path={path}
            options={{
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                clickable: false,
                draggable: false,
                editable: false,
                visible: true,
                radius: 30000,
                zIndex: 1
            }}
        />
    )
}

export default Route