import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DiscoveryQuestion from './DiscoveryQuestion';

configure({ adapter: new Adapter() });
describe('<DiscoveryQuestion />', () => {
	it('renders without crashing', () => {
		mount(
			<BrowserRouter>
				<DiscoveryQuestion />
			</BrowserRouter>
		);
	});
});
