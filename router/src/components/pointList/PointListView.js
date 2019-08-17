import React from 'react'
import PointItem from './pointItem/PointItem'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import PropTypes, { number, string, func } from 'prop-types'
import './PointListView.scss'

const getListStyle = isDraggingOver => ({
	border: isDraggingOver ? 'dashed 1px gray' : 'solid 1px white'
});

const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? '#CDDC39' : '#8BC34A',  
    ...draggableStyle
});

export function PointListView({ points, onDragEnd, removePoint }) {
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
		<div className="points-container">
			<span>Маршрут</span>
			{(points && points.length) > 0 ? (
				<DragDropContext onDragEnd={(result) => onDragEnd(result)}>
					<Droppable droppableId="droppable">
						{(provided, snapshot) => (
							<div className="points-column"
								{...provided.droppableProps}
								ref={provided.innerRef}
								style={getListStyle(snapshot.isDraggingOver)}
								data-testid="point-column">
									{pointItems}				
									{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			) : (
				<div className="empty-point-list">Список точек пуст</div>
			)}			
		</div>
		
	)
}

PointListView.propTypes = {
	points: PropTypes.arrayOf(PropTypes.shape({
		id: number,
        index: number,
        coordinates: PropTypes.arrayOf(number),
        name: string,
	})),
	onDragEnd: func,
	removePoint: func,
}

export default PointListView
