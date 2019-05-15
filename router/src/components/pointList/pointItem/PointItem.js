import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import './PointItem.scss'

const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? '#CDDC39' : '#8BC34A',  
    ...draggableStyle
});

export function PointItem({point, index, removePoint}) {
    const { name, id } = point
    
    return (
        <Draggable key={point.id} draggableId={point.id} index={index}>
            {(provided, snapshot) => (
            <div 
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
                )}
                className='point-item'
            >
                <div data-testid="task-content" className="point-item__name">{name}</div>
                <div className="point-item__remove-icon" onClick={() => removePoint(id)}>x</div>     
            </div>
            )}
        </Draggable>
    )
}

export default PointItem