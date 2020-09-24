import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Form from './Form';

configure({ adapter: new Adapter() });
describe('<Form />', () => {
	it('renders without crashing', () => {
		mount(
			<BrowserRouter>
				<Form />
			</BrowserRouter>
		);
	});
});
