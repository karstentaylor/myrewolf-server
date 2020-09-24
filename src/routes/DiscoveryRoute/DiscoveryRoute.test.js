import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DiscoveryRoute from './DiscoveryRoute';

configure({ adapter: new Adapter() });
describe('<DiscoveryRoute />', () => {
	it('renders without crashing', () => {
		mount(
			<BrowserRouter>
				<DiscoveryRoute />
			</BrowserRouter>
		);
	});
});
