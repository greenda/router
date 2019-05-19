import React from "react"
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel"

const labelWidth = 100

export function Markers({ points }) {
    return (
        points.map(point => (
            <MarkerWithLabel
                key={point.id}
                position={{ lat: point.coordinates[0], lng: point.coordinates[1] }}
                labelAnchor={{ x: (labelWidth/2), y: 0 }}
                labelStyle={{fontSize: "16px", textAlign: "center", width: `${labelWidth}px` }}
            >
                <div>{point.name}</div>
            </MarkerWithLabel>
        ))
    )
}

export default Markers