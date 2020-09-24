import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HomePageRoute from './HomePageRoute';

configure({ adapter: new Adapter() });
describe('<HomePageRoute />', () => {
	it('renders without crashing', () => {
		mount(
			<BrowserRouter>
				<HomePageRoute />
			</BrowserRouter>
		);
	});
});
