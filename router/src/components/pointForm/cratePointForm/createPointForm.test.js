import React from 'react';
import { CreatePointFormContainer } from './CreatePointFormContainer'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

const simulateKeyPresses = (element, characters) => {
    if (characters) {
        characters.split('').forEach(character => {
            element.simulate('keyDown', {
                which: character.charCodeAt(),
                key: character,
                keyCode: character.charCodeAt()
              });
        })
    }
}

describe('CreatePointForm', () => {
    it('render correctly point', () => {
        const element = renderer.create(
			<CreatePointFormContainer />
		).toJSON();
		expect(element).toMatchSnapshot();
    })

    it('input correct value', () => {
        const MOCK_INPUT_TEXT = 'new point name'
        const MOCK_CENTER = [100, 100]

        const hundleAddPoint = (pointName, center) => {
            expect(pointName).toEqual(MOCK_INPUT_TEXT)
            expect(center).toEqual(MOCK_CENTER)
        }
        const form = mount(
            <CreatePointFormContainer 
                mapCenter={MOCK_CENTER} 
                addPoint={hundleAddPoint} />
        )
        const inputElement = form.find('.add-point-form__input')
        
        const event = { target: { name: 'pollName', value: MOCK_INPUT_TEXT }};
        inputElement.simulate('change', event);

        inputElement.simulate('keyDown', {keyCode: 13, shiftKey: false})
    })

    it('input incorrect value (check validation)', () => {
        const MOCK_INPUT_TEXT = 'to long valu-u-u-u-u-u-u-u-u-u-ue'
        const form = mount(
            <CreatePointFormContainer />
        )
        const inputElement = form.find('.add-point-form__input')
        
        const event = { target: { name: 'pollName', value: MOCK_INPUT_TEXT }};
        inputElement.simulate('change', event)
        expect(form.find('.add-point-form__error').text())
            .toEqual('Длина названия точки - не более 30 символов')
    })
})