import React from 'react';
import { PointList } from './PointList'
import { render, within } from 'react-testing-library';
import {
  mockGetComputedSpacing,
  mockDndElSpacing,
  makeDnd,
  DND_DIRECTION_UP,
} from 'react-beautiful-dnd-test-utils';

const points = [
    {
        id: 1,
        coordinates: [-41.28, 174.69],
        name: 'first point'
    },
    {
        id: 2,
        coordinates: [-41.24, 174.74],
        name: 'second point'
    },
    {
        id: 3,
        coordinates: [-41.30, 174.78],
        name: 'third point'
    },
]

const createTestTextOrderByTestIdHelper = getAllByTestId => {
    const testTextOrderByTestId = (testId, expectedTexts) => {
      const texts = getAllByTestId(testId).map(x => x.textContent);
      expect(texts).toEqual(expectedTexts)
    };
    return testTextOrderByTestId;
};

const renderApp = (changePointOrder) => {
    const rtlUtils = render(<PointList points={points} addPoint={() => {}} changePointOrder={changePointOrder}/>);
  
    mockDndElSpacing(rtlUtils)
  
    const makeGetDragEl = text => () =>
      rtlUtils.getByText(text).parentElement
    
    const getByText = (text) => rtlUtils.getByText(text).parentElement
  
    return { getByText, makeGetDragEl, wraper: rtlUtils, ...rtlUtils }
};

describe('PointList', () => {
    beforeEach(() => {
      mockGetComputedSpacing();
    });

    describe('render', () => {
      test('render list from data', async () => {
        const { getByTestId, wraper } = renderApp(() => {})
        const { getAllByTestId: getAllByTestIdWithinColumn } = within(
          getByTestId('to-do-column'),
        );
        const testTextOrderByTestId = createTestTextOrderByTestIdHelper(
          getAllByTestIdWithinColumn,
        );
        testTextOrderByTestId('task-content', [
          'first point',
          'second point',
          'third point',          
        ]);
        wraper.unmount()
        
      })
    })
  
    describe('dnd', () => {
      test('moves a task up inside a column', async () => {
        const changePointOrder = (itemIndex, destinationIndex) => {
          expect(itemIndex).toEqual(2)
          expect(destinationIndex).toEqual(1)
        }
        const { getByText, makeGetDragEl, wraper } = renderApp(changePointOrder);
  
        await makeDnd({
          getByText,
          getDragEl: makeGetDragEl('third point'),
          direction: DND_DIRECTION_UP,
          positions: 1,
        });

        wraper.unmount()
      });
    });
});
