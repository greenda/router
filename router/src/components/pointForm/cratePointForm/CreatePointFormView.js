import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './CreatePointFormView.scss'

export function CreatePointFormView({ addPoint }) {
    const [ pointName, setPointName ] = useState('')
    const [ inputError, setInputError]  = useState('')

    const handleInputChange = (event) => {
        const newPointName = event.target.value

        if (newPointName.length > 30) {
            setInputError('Длина названия точки - не более 30 символов')
        } else {
            setPointName(newPointName)
            setInputError(null)
        }
    }
    
    const handleInputKeyDown = (event) => {
        if(event.keyCode === 13 && event.shiftKey === false) {
            if (pointName) {
                addPoint(pointName)
                setPointName('')
            }
        }
    }

    return (
        <div className={`add-point-form__container ${inputError ? 'error' : ''}`}>
            <span className="add-point-form__label">Добавить точку</span>
            <input 
                type="text"
                placeholder="Новая точка маршрута"
                className="add-point-form__input"
                value={pointName}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}></input>
            <span className="add-point-form__error">{inputError}</span>
        </div>        
    )
}


CreatePointFormView.propTypes = {
    addPoint: PropTypes.func,
}

export default CreatePointFormView