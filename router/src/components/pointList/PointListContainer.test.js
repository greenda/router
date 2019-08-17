import React from 'react';
import { PointListContainer } from './PointListContainer'
import { render, within } from '@testing-library/react'
import {
	mockGetComputedSpacing,
	mockDndElSpacing,
	makeDnd,
	DND_DIRECTION_UP,
} from 'react-beautiful-dnd-test-utils'

const mockPoints = [
	{
		id: 1,
		index: 0,
		coordinates: [-41.28, 174.69],
		name: 'first point'
	},
	{
		id: 2,
		index: 1,
		coordinates: [-41.24, 174.74],
		name: 'second point'
	},
	{
		id: 3,
		index: 2,
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

const renderApp = (points, changePointOrder) => {
	const pointListElement = 
		render(<PointListContainer points={points} changePointOrder={changePointOrder} />);

	mockDndElSpacing(pointListElement)

	const makeGetDragEl = text => () => {
		return pointListElement.getByText(text).parentElement.parentElement
	}

	const getByText = (text) => pointListElement.getByText(text).parentElement.parentElement

	return { getByText, makeGetDragEl, wraper: pointListElement, ...pointListElement }
};

describe('PointListContainer', () => {
	beforeEach(() => {
		mockGetComputedSpacing();
	});

	it('render list from data', async () => {
		const { getByTestId, wraper } = renderApp(mockPoints)
		const { getAllByTestId: getAllByTestIdWithinColumn } = within(
			getByTestId('point-column'),
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

	it('render empty list', async () => {
		const { wraper } = renderApp(mockPoints)
		expect(wraper.findByText('Список точек пуст')).not.toBeUndefined();
		wraper.unmount()
	})

	it('moves a task up inside a column', async () => {
		const changePointOrder = (itemIndex, destinationIndex) => {
			expect(itemIndex).toEqual(2)
			expect(destinationIndex).toEqual(1)
		}
		const { getByText, makeGetDragEl, wraper } = renderApp(mockPoints, changePointOrder);

		await makeDnd({
			getByText,
			getDragEl: makeGetDragEl('third point'),
			direction: DND_DIRECTION_UP,
			positions: 2,
		});

		wraper.unmount()
	});	
});
