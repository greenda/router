import React from 'react'
import { connect } from 'react-redux'
import { addPoint } from '../../../actions/actions'
import { mapCenterSelector } from '../../../selectors/index'
import './createPointForm.scss'

export function CreatePointForm({ addPoint, mapCenter }) {
    return (
        <div className="add-point-form__container">
            <span className="add-point-form__label">Добавить точку</span>
            <input type="text" className="add-point-form__input" onKeyDown={onAddPoint.bind({ mapCenter, addPoint })}></input>
        </div>        
    )
}

function onAddPoint(event) {
    if(event.keyCode === 13 && event.shiftKey === false) {
        const pointName = event.currentTarget.value
        if (pointName) {
            this.addPoint(pointName, this.mapCenter)
        }
    }
}

export default connect(
    (store) => ({
        mapCenter: mapCenterSelector(store)
    }),
    { addPoint }
)(CreatePointForm)
// TODO PropsTypes