import React from 'react'
import { connect } from 'react-redux';
import { pointArraySelector } from '../../selectors/index'
import PointItem from './pointItem/PointItem'
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { changePointOrder } from '../../actions/actions'
import './PointList.scss'

function onDragEnd(result, changePointOrder) {
    if (!result.destination) {
      return;
    }

    const itemIndex = result.source.index
    const destinationIndex = result.destination.index
    changePointOrder(itemIndex, destinationIndex)
}
  
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : '',
});

export function PointList({ points, addPoint, changePointOrder }) {
    return (    
        <DragDropContext onDragEnd={(result) => onDragEnd(result, changePointOrder)}>
            <Droppable droppableId="droppable">
            {(provided, snapshot) => (
            <div className='points-container'
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              data-testid='to-do-column'
                       
            >
              {points.map((point, index) => (
                    <PointItem key={point.id} point={point} index={index}>PointList</PointItem>
                ))}
              {provided.placeholder}
            </div>
          )}
            </Droppable>
        </DragDropContext>
    )
}

export default connect(
    (state) => ({
        points: pointArraySelector(state)
    }),
    { changePointOrder }
)(PointList)