import React from 'react';
import { PointListContainer } from './PointListContainer'
import { render, within } from '@testing-library/react'
import {
	mockGetComputedSpacing,
	mockDndElSpacing,
	makeDnd,
	DND_DIRECTION_UP,
} from 'react-beautiful-dnd-test-utils'
import { mockPoints } from '../../mock/mock'

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
