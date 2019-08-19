import React from 'react'
import PropTypes, { func, number } from 'prop-types'
import { connect } from 'react-redux'
import { addPoint } from '../../../actions/actions'
import { mapCenterSelector } from '../../../selectors/index'
import CreatePointFormView from './CreatePointFormView'

export function CreatePointFormContainer({ addPoint, mapCenter }) {
    const hundleAddPoint = (pointName) => {
        addPoint(pointName, mapCenter)
    }
    return (
        <CreatePointFormView addPoint={hundleAddPoint}/>
    )
}

CreatePointFormContainer.propTypes = {
    addPoint: func,
    mapCenter: PropTypes.shape({
        lat: number,
        lng: number,
    }),
}

export default connect(
    (store) => ({
        mapCenter: mapCenterSelector(store)
    }),
    { addPoint }
)(CreatePointFormContainer)