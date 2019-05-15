import React from 'react'
import { connect } from 'react-redux';
import { pointArraySelector } from '../../selectors/index'
import PointItem from './pointItem/PointItem'
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { changePointOrder, removePoint } from '../../actions/actions'
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
    border: isDraggingOver ? 'dashed 1px gray' : 'solid 1px white'
});

export function PointList({ points, changePointOrder, removePoint }) {
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
              <span>Маршрут</span>
              {points.map((point, index) => (
                    <PointItem key={point.id} point={point} index={index} removePoint={removePoint}>PointList</PointItem>
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
    { changePointOrder, removePoint }
)(PointList)