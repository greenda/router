import React from 'react'
import { connect } from 'react-redux'
import { pointArraySelector } from '../../selectors/index'
import { changeMapCenter } from '../../actions/actions'
import MapView from './MapView'

export function MapContainer({ points, changeMapCenter }) {
    return (
        <MapView points={points} onChangeCenter={onMapCenterChange.bind({ changeMapCenter })}/>
    )
}

function onMapCenterChange({ lat, lng}) {
    this.changeMapCenter([lat(), lng()])    
}

export default connect(
    (state) => ({
        points: pointArraySelector(state)
    }),
    { changeMapCenter }
)(MapContainer)