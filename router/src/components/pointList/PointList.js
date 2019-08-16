import React from 'react'
import { connect } from 'react-redux'
import { pointArraySelector } from '../../selectors/index'
import PointItem from './pointItem/PointItem'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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

const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? '#CDDC39' : '#8BC34A',  
    ...draggableStyle
});

export function PointList({ points, changePointOrder, removePoint }) {
	const pointItems = points.map((point, i) => (
		<Draggable key={point.id} draggableId={point.id} index={point.index}>
			{(provided, snapshot) => (
				<div 
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					style={getItemStyle(
						snapshot.isDragging,
						provided.draggableProps.style
					)}
					className="point-item-container">
					   <PointItem point={point} removePoint={removePoint}/>
				</div>
			)}
		</Draggable>
	))


	return (
		<DragDropContext onDragEnd={(result) => onDragEnd(result, changePointOrder)}>
			<Droppable droppableId="droppable">
				{(provided, snapshot) => (
					<div className='points-container'
						{...provided.droppableProps}
						ref={provided.innerRef}
						style={getListStyle(snapshot.isDraggingOver)}
						data-testid='to-do-column'>
							<span>Маршрут</span>
							{pointItems}
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