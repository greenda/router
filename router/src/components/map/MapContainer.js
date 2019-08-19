import React from 'react'
import { connect } from 'react-redux'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import PropTypes, { number, string, func } from 'prop-types'
import { pointArraySelector } from '../../selectors/index'
import { changeMapCenter, changePointCoordinate } from '../../actions/actions'
import MapView from './MapView'

export function MapContainer({ points, changeMapCenter, changePointCoordinate }) {
    const changeCenterObserver = new Subject()
    changeCenterObserver
        .pipe(
            debounceTime(300),
        )
        .subscribe((center) => {
            if (center) {
                changeMapCenter(center)
            }
        })

    return (
        <MapView
            points={points}
            onChangeMapCenter={center => changeCenterObserver.next(center)}
            changePointCoordinate={changePointCoordinate}
        />
    )
}

MapContainer.propTypes = {
    points: PropTypes.arrayOf(PropTypes.shape({
		id: number,
        index: number,
        coordinates: PropTypes.shape({
            lat: number,
            lng: number,
        }),
        name: string,
    })),
    changeMapCenter: func,
    changePointCoordinate: func,
}

export default connect(
    (state) => ({
        points: pointArraySelector(state)
    }),
    { changeMapCenter, changePointCoordinate }
)(MapContainer)