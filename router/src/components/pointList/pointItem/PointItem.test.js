import React from 'react';
import { PointItem } from './PointItem'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

const mockPoint = {
	id: 1,
	coordinates: [-41.28, 174.69],
	name: 'first point'
}
describe('PointItem', () => {
	it('render correctly point item component', () => {
		const element = renderer.create(
			<PointItem point={mockPoint} />
		).toJSON();
		expect(element).toMatchSnapshot();
	})

	it('call remove function', () => {
		const removeFunction = (pointId) => {
			expect(pointId).toEqual(mockPoint.id)		
		}

		const pointItem = mount(
			<PointItem point={mockPoint} removePoint={removeFunction}/>
		)
		pointItem.find('.point-item__remove-icon').simulate('click')
	})
})
