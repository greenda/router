import React from 'react'
import { PointInfo } from './PointInfo'
import { shallow } from 'enzyme'
import { mockPoints } from '../../../mock/mock'

describe('PointInfo', () => {
  it('render pointInfo', () => {   
      const wrapper = shallow(
        <PointInfo 
          point={mockPoints[0]}
        />
      )
      expect(wrapper.find('.point-info-window > span').text()).toEqual('first point')
  })
})