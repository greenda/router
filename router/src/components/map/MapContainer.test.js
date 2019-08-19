import React from 'react'
import { MapContainer } from './MapContainer'
import { shallow  } from 'enzyme'
import { mockPoints } from '../../mock/mock'

describe('MapContainer', () => {
  it('right container props', () => {
    const onChangeMapCenterHundler = () => {}
    const changePointCoordinate = () => {}
    const wrapper = shallow(
      <MapContainer 
        points={mockPoints}
        onChangeMapCenter={onChangeMapCenterHundler}
        changePointCoordinate={changePointCoordinate}
      />
    );
    expect(wrapper.prop('points')).toEqual(mockPoints)
    expect(wrapper.prop('onChangeMapCenter')).toBeDefined()
    expect(wrapper.prop('changePointCoordinate')).toBeDefined()
  })
})