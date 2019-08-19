
import React from 'react'
import { PointMarkers } from './PointMarkers'
import { shallow  } from 'enzyme'
import { mockPoints } from '../../../mock/mock'
describe('PointListContainer', () => {
    it('render markers', () => {
        const wrapper = shallow(
        <PointMarkers 
            points={mockPoints}
        />
        )

        expect(wrapper.length).toEqual(3)
        wrapper.forEach((node, index) => {
            const childProps = node.children().props()
            expect(childProps.position).toEqual(mockPoints[index].coordinates)
            expect(childProps.onDragEnd).not.toBeUndefined();
            expect(childProps.onClick).not.toBeUndefined();
        })
    })
})