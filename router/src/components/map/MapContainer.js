import React from 'react'
import { connect } from 'react-redux'
import { Subject } from 'rxjs'
import { debounceTime, map } from 'rxjs/operators'
import { pointArraySelector } from '../../selectors/index'
import { changeMapCenter } from '../../actions/actions'
import MapView from './MapView'

export function MapContainer({ points, changeMapCenter }) {
  const changeCenterObserver = new Subject()
  changeCenterObserver
    .pipe(
      debounceTime(300),
      map(({lat, lng}) => [lat(), lng()])
    )
    .subscribe((center) => {
      if (center) {
        changeMapCenter(center)
      }
    })

    return (
        <MapView points={points} onChangeMapCenter={center => changeCenterObserver.next(center)} />
    )
}

export default connect(
    (state) => ({
        points: pointArraySelector(state)
    }),
    { changeMapCenter }
)(MapContainer)