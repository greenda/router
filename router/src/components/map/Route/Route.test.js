import React from 'react'
import { Route } from './Route'
import { shallow  } from 'enzyme'
import { mockPoints } from '../../../mock/mock'
describe('Route', () => {
    it('route render', () => {
        const wrapper = shallow(
            <Route points={mockPoints} />
        )

        expect(wrapper.exists()).toEqual(true)
        expect(wrapper.props().path)
            .toEqual([ 
                { lat: -41.28, lng: 174.69 },
                { lat: -41.24, lng: 174.74 }, 
                { lat: -41.3, lng: 174.78 }
            ])
    })
})