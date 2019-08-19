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
        expect(wrapper.props().path).toEqual([ [ -41.28, 174.69 ], [ -41.24, 174.74 ], [ -41.3, 174.78 ] ])
    })
})